import { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUser(data))
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">User Profile</h1>
        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold">First Name:</span> {user.firstName}
          </div>
          <div>
            <span className="font-semibold">Last Name:</span> {user.lastName}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Username:</span> {user.username}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
