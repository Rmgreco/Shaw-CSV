import React from 'react';

interface UserCardProps {
  user: {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
  }; 
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const cardStyle = {
    padding: '10px', 
    border: '1px solid #ccc', 
  };
  return (
    <div className="user-card" style={cardStyle}>
      <p>Name: {user.name}</p>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite sport: {user.favorite_sport}</p>
    </div>
  );
};

export default UserCard;
