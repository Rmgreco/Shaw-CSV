'use client'

import React, { useState } from 'react';
import FileUploadButton from '../components/FileUploadButton';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import ErrorDisplay from '../components/ErrorDisplay';
import './home.css';

interface CsvRow {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}


const Home: React.FC = () => {
  const [fileData, setFileData] = useState<CsvRow[]>([]); 
  const [error, setError] = useState<string>('');
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3000/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      
      const data = await response.json();
      
      
      setFileData(data.data);
      setError('');
    } catch (error) {
      setError('Error uploading file');
      console.error(error);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      console.log(data, "dois");
      
      setFileData(data); 
      setError('');
    } catch (error) {
      setError('Error searching data');
      console.error(error);
    }
  };


  return (
    <div >
      <h1>CSV Data Viewer</h1>
      <FileUploadButton onFileUpload={handleFileUpload} />
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorDisplay error={error} />}

      <div className="user-cards">
        {fileData.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
