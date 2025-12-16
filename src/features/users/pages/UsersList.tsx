import { useEffect, useState } from 'react';
import { fetchOneUser, fetchUsers, followCount } from '../api';
import { UserCard } from '../components/UserCard';
import { getUserID } from '../../../lib/auth';
import './UsersList.scss';

export const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [followCounts, setFollowCounts] = useState<{ followers: number; following: number }>({
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));

    const userId = getUserID();

    if (userId) {
      fetchOneUser(+userId).then(res => {
        setUserName(res.data.username);
      });

      followCount(+userId).then(res => {
        setFollowCounts(res.data);
      });
    }
  }, []);

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

      <div className="user-cards">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
