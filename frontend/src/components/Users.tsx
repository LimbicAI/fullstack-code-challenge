import { observer } from "mobx-react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUserStore } from "../contexts/UserContext";

const Users = observer(() => {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.get();
  }, [userStore]);

  return (
    <div>
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fullname</th>
            <td>View</td>
          </tr>
        </thead>
        <tbody>
          {userStore.users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullname}</td>
              <td>
                <Link to={`/answers?userId=${user.id}`}>
                  <button className="btn btn-success">Answers</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Users;
