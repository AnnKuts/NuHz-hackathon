import type { ProjectListFieldProps } from "../types";

export const ProjectListField = ({ field, formData, onAdd, onRemove, onUpdate }: ProjectListFieldProps) => {
  const projects = formData.projects || [];

  return (
    <div className="mastercv__form-group">
      <div className="mastercv__form-label-with-button">
        <label className="mastercv__form-label">{field.label}</label>
        <button
          type="button"
          className="add-button"
          onClick={onAdd}
        >
          +
        </button>
      </div>
      <div className="project-list-container">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <input
              className="mastercv__form-input"
              type="text"
              value={project.title}
              onChange={(e) => onUpdate(index, 'title', e.target.value)}
              placeholder="Project Title"
            />
            <input
              className="mastercv__form-input"
              type="text"
              value={project.link}
              onChange={(e) => onUpdate(index, 'link', e.target.value)}
              placeholder="Project Link"
            />
            <textarea
              className="mastercv__form-textarea"
              value={project.summary}
              onChange={(e) => onUpdate(index, 'summary', e.target.value)}
              placeholder="Project Summary"
              rows={3}
            />
            {index > 0 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => onRemove(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};