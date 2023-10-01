import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
