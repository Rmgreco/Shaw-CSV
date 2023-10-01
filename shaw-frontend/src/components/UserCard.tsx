import React from 'react';

interface UserCardProps {
  user: any; // Replace with your user data type
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const cardStyle = {
    padding: '10px', // Adjust the padding value as needed
    border: '1px solid #ccc', // Optional: Add a border for visual separation
  };
  return (
    <div className="user-card" style={cardStyle}>
      <p>Name: {user.name}</p>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite sport: {user.favorite_sport}</p>
      {/* Add more user data fields */}
    </div>
  );
};

export default UserCard;
