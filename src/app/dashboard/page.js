"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  // Session load ho rahi hai
  if (status === "loading") {
    return <div>Loading...</div>;
  }


  if (!session) {
    return <div>Please login first.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome {session.user.name}</p>
      <p>{session.user.email}</p>
    </div>
  );
};

export default Dashboard;