import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Link href="/">
        <button>Go to Home</button>
      </Link>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
