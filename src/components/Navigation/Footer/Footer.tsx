
import "./Footer.scss";

const Footer = () => {
  const teamMembers = [
    { name: "Mariia Khorunzha", github: "https://github.com/Impe11e" },
    { name: "Anna Kuts", github: "https://github.com/AnnKuts" },
    { name: "Vladyslav Mykhailov", github: "https://github.com/taitami" },
    { name: "Ivanna Malashchuk", github: "https://github.com/ivannamal" },
  ];

  return (
    <footer className="footer">
      <div className="footer__team">
        {teamMembers.map((member, index) => (
          <div key={index} className="footer__member">
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> {member.name}
            </a>
          </div>
        ))}
      </div>
      <div className="footer__container">
        <div className="footer__content">
          <p>© 2025 NuHz Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;