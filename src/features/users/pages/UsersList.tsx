import { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import { UserCard } from '../components/UserCard';

export const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Discover users</h2>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};