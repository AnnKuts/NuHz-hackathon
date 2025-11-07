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
      </div>
    </div>
  );
};

export default Dashboard;