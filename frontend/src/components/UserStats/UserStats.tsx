import React, { useState, useEffect } from "react";
import { getInterviewResults } from "../../utils/interviewStorage";
import "./UserStats.scss";

interface UserStatsData {
  cvsCreated: number;
  interviewsTaken: number;
  lastInterviewScore: string | null;
}

const UserStats: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStatsData>({
    cvsCreated: 0,
    interviewsTaken: 0,
    lastInterviewScore: null
  });

  useEffect(() => {
    const interviewResults = getInterviewResults();
    const cvExports = JSON.parse(localStorage.getItem('cv_exports') || '[]');
    
    const lastResult = interviewResults.length > 0 
      ? interviewResults[interviewResults.length - 1]
      : null;
    
    setUserStats({
      cvsCreated: cvExports.length,
      interviewsTaken: interviewResults.length,
      lastInterviewScore: lastResult 
        ? `${lastResult.score}/${lastResult.totalQuestions}` 
        : null
    });
  }, []);

  return (
    <div className="user-stats">
      <div className="user-stats__container">
        <h3 className="user-stats__title">Your Progress</h3>
        <div className="user-stats__grid">
          <div className="stat-card">
            <div className="stat-number">{userStats.cvsCreated}</div>
            <div className="stat-label">CVs Created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{userStats.interviewsTaken}</div>
            <div className="stat-label">Interviews Taken</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {userStats.lastInterviewScore || 'N/A'}
            </div>
            <div className="stat-label">Last Interview Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;