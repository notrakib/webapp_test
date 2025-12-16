import { useEffect, useState } from 'react';
import { fetchOneUser, followCount } from '../api';
import { MurmurCard } from '../../murmurs/components/MurmurCard';
import { Murmur } from '../../murmurs/type';
import './UsersList.scss';
import { fetchTimeline } from '../../murmurs/api';
import { useParams } from 'react-router-dom';

export const UsersDetails = () => {
  const [userName, setUserName] = useState<string>('');
  const [followCounts, setFollowCounts] = useState<{ followers: number; following: number }>({
    followers: 0,
    following: 0,
  });
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [loading, setLoading] = useState(false);

  const { currentUserId } = useParams<{ currentUserId: string }>();

  useEffect(() => {
    if (!currentUserId) return;

    fetchOneUser(+currentUserId).then(res => setUserName(res.data.username));

    followCount(+currentUserId).then(res => setFollowCounts(res.data));

    loadUserMurmurs();
  }, []);

  const loadUserMurmurs = async () => {
    if (!currentUserId) return;
    setLoading(true);

    try {
      const res = await fetchTimeline(1);
      const { data } = res.data;

      const userMurmurs = data.filter((m: Murmur) => m.user_id === +currentUserId);
      setMurmurs(userMurmurs);
    } catch (err) {
      console.error('Failed to fetch user murmurs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setMurmurs(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="users-list">
      <h2>Discover users</h2>

      {userName && (
        <div className="profile-badge">
          <span className="username">{userName}</span>
          <span className="counts">
            Followers: <strong>{followCounts.followers}</strong> | Following: <strong>{followCounts.following}</strong>
          </span>
        </div>
      )}

      <div className="user-murmurs">
        {loading && <p>Loading murmurs...</p>}
        {murmurs.map(m => (
          <MurmurCard
            key={m.id}
            murmur={m}
            currentUserId={currentUserId}
            onDelete={handleDelete}
            fromTimeline= {false}
          />
        ))}
        {!loading && murmurs.length === 0 && <p>No murmurs yet.</p>}
      </div>
    </div>
  );
};
