import { FiUsers } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-top">
        <h3>{project.title}</h3>
        <span
          className={
            project.status === "Ouvert" ? "status-open" : "status-closed"
          }>
          {project.status}
        </span>
      </div>

      <p className="project-description">
        Platforme E-learning Accessible Au Maroc
      </p>

      <div className="project-money">
        <div>
          <small>Capital cible</small>
          <h4>{project.target}</h4>
        </div>

        <div>
          <small>Capital levé</small>
          <h4>{project.raised}</h4>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-text">
          <span>Progression</span>
          <span>{project.progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      <hr className="line"></hr>

      <div className="investors-count">
          <div className="investors-count">
            <FiUsers/>
            <span>{project.investors} Investisseurs</span>
          </div>
      </div>

    </div>
  );
};
export default ProjectCard;
