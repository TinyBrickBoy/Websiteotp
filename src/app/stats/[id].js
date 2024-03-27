// pages/users/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://api.onthepixel.net/player/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>User Details</h1>
          <p>Username: {userData.username}</p>
          <p>Points: {userData.points}</p>
          <p>Parkour Score: {userData.parkourScore}</p>
          <h2>Bedwars Stats</h2>
          <p>Score: {userData.bedwarsStats.score}</p>
          <p>Kills: {userData.bedwarsStats.kills}</p>
          <p>Deaths: {userData.bedwarsStats.deaths}</p>
          <p>Wins: {userData.bedwarsStats.wins}</p>
          <p>Loses: {userData.bedwarsStats.loses}</p>
          <p>Destroyed Beds: {userData.bedwarsStats.destroyedBeds}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
