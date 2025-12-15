import { useEffect, useState } from 'react'
import './Timeline.scss'
import { fetchTimeline } from '../api'
import { MurmurCard } from '../components/MurmurCard'
import { Murmur } from '../type'
import { Link, useNavigate } from 'react-router-dom'
import { MurmurComposer } from '../components/MurmurComposer'
import { clearToken, clearUserID, getUserID } from '../../../lib/auth'

export function Timeline() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMurmurs, setTotalMurmurs] = useState(0)
  const [loading, setLoading] = useState(false)

  const currentUserId = Number(getUserID())
  const navigate = useNavigate()

  useEffect(() => {
    loadTimeline(1, true)
  }, [])

  const loadTimeline = async (pageToLoad: number, reset = false) => {
    if (loading) return

    try {
      setLoading(true)
      const res = await fetchTimeline(pageToLoad)
      const { data, meta } = res.data

      setMurmurs(reset ? data : [...data])
      setPage(meta.page)
      setTotalMurmurs(meta.total)
      setTotalPages(meta.totalPages)
    } catch (err) {
      console.error('Failed to fetch murmurs', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: number) => {
    setMurmurs(prev => prev.filter(m => m.id !== id))
  }

  const handleLogout = () => {
    clearToken()
    clearUserID()
    navigate('/login')
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === page) return
    loadTimeline(pageNumber, true)
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`page-btn ${page === i ? 'active' : ''}`}
          disabled={loading}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  return (
    <div className="timeline">
      <div className="timeline-header">
        <Link to="/find-users" className="find-users-btn">
          🔍 Find Users
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <MurmurComposer onMurmurPosted={() => loadTimeline(1, true)} />

      {murmurs.map(m => (
        <MurmurCard
          key={m.id}
          murmur={m}
          currentUserId={currentUserId}
          onDelete={handleDelete}
          fromTimeline = {true}
        />
      ))}

      <div className="murmur-count">
        Total Murmurs: {totalMurmurs}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  )
}
