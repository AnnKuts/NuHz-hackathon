import type { ExperienceListFieldProps } from "../types";

export const ExperienceListField = ({ field, formData, onAdd, onRemove, onUpdate }: ExperienceListFieldProps) => {
  const experiences = formData.experiences || [];

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
      <div className="experience-list-container">
        {experiences.map((experience, index) => (
          <div key={index} className="experience-item">
            <input
              className="mastercv__form-input"
              type="text"
              value={experience.position}
              onChange={(e) => onUpdate(index, 'position', e.target.value)}
              placeholder="Position"
            />
            <input
              className="mastercv__form-input"
              type="text"
              value={experience.company}
              onChange={(e) => onUpdate(index, 'company', e.target.value)}
              placeholder="Company"
            />
            <input
              className="mastercv__form-input"
              type="text"
              value={experience.startDate}
              onChange={(e) => onUpdate(index, 'startDate', e.target.value)}
              placeholder="Start Date"
            />
            <input
              className="mastercv__form-input"
              type="text"
              value={experience.endDate}
              onChange={(e) => onUpdate(index, 'endDate', e.target.value)}
              placeholder="End Date"
            />
            <textarea
              className="mastercv__form-textarea"
              value={experience.summary}
              onChange={(e) => onUpdate(index, 'summary', e.target.value)}
              placeholder="Experience Summary"
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