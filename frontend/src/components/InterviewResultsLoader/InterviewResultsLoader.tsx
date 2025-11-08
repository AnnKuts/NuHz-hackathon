import React from 'react';
import { getLatestInterviewResult, formatInterviewResult } from '../../utils/interviewStorage';

interface InterviewResultsLoaderProps {
  onLoad: (result: string) => void;
  className?: string;
  currentValue?: string;
}

export const InterviewResultsLoader: React.FC<InterviewResultsLoaderProps> = ({ 
  onLoad, 
  className,
  currentValue 
}) => {
  const handleLoadLatestResult = () => {
    const latestResult = getLatestInterviewResult();
    if (latestResult) {
      const formattedResult = formatInterviewResult(latestResult);
      onLoad(formattedResult);
    }
  };

  const latestResult = getLatestInterviewResult();

  if (!latestResult) {
    return (
      <div className={className}>
        <p>No interview results available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div style={{ marginBottom: '12px' }}>
        <button 
          type="button" 
          onClick={handleLoadLatestResult}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4a5568',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            marginRight: '8px'
          }}
        >
          Load Latest Interview Results
        </button>
        {currentValue && (
          <button 
            type="button" 
            onClick={() => onLoad('')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Clear
          </button>
        )}
      </div>
      
      {currentValue && (
        <div style={{ 
          padding: '8px 12px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '4px',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          <strong>Current:</strong> {currentValue}
        </div>
      )}
      
      <div style={{ fontSize: '12px', color: '#666' }}>
        Latest available: {formatInterviewResult(latestResult)}
      </div>
    </div>
  );
};