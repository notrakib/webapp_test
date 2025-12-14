import { useEffect, useState } from 'react'
import { fetchTimeline } from '../api'
import { MurmurCard } from '../components/MurmurCard'
import { Murmur } from '../type'
import { Link, useNavigate } from 'react-router-dom'
import { MurmurComposer } from '../components/MurmurComposer'

export function Timeline() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const currentUserId = Number(localStorage.getItem('user_id')) // set at login

  const navigate = useNavigate()

  useEffect(() => {
    loadTimeline()
  }, [])

  const loadTimeline = async () => {
    const res = await fetchTimeline();
    setMurmurs(res.data);
    };

  const handleDelete = (id: number) => {
    setMurmurs((prev) => prev.filter((m) => m.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('access_token') 
    navigate('/login')
  }

  return (
    <div className="timeline">
      <div className="timeline-header">
        <Link to="/users" className="find-users-btn">
          🔍 Find Users
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <MurmurComposer onMurmurPosted={loadTimeline} />

      {murmurs.map((m) => (
        <MurmurCard
          key={m.id}
          murmur={m}
          currentUserId={currentUserId}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
