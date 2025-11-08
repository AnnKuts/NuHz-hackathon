import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateCV = () => {
    navigate("/master-cv");
  };
  const handleInterview = () => {
    navigate("/interview");
  };

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <div className="dashboard__left">
          <h1 className="dashboard__title">
            Create CV online for free with NuHz team
          </h1>
          <h4 className="dashboard__subtitle">
            Save your time and prepare for interview
          </h4>
          <div className="dashboard__buttons">
            <button className="dashboard__button-CV" onClick={handleCreateCV}>
              Create CV now!
            </button>
            <button className="dashboard__button-Interview" onClick={handleInterview}>
              Interview simulator
            </button>
            <button 
              className="dashboard__button-clear" 
              onClick={() => {
                localStorage.clear();
                alert('LocalStorage cleared!');
              }}
            >
              Clear Data
            </button>
          </div>
        </div>
        <div className="dashboard__right">
          <div className="dashboard__cv-preview">
            <div className="cv-mockup">
              <div className="cv-header"></div>
              <div className="cv-lines">
                <div className="cv-line"></div>
                <div className="cv-line short"></div>
                <div className="cv-line"></div>
                <div className="cv-line medium"></div>
                <div className="cv-line"></div>
                <div className="cv-line short"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;