import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Create CV online for free with NuHz team</h1>
            <h4 className="dashboard__subtitle">Save your time and prepare for interview</h4>
            <div className="dashboard__buttons">
                <button className="dashboard__button-CV">Create CV now!</button>
                <button className="dashboard__button-Interview">Interview simulator</button>
            </div>
        </div>
    );
};

export default Dashboard;
