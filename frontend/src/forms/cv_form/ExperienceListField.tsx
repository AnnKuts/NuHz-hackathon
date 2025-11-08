import type { ExperienceListFieldProps } from "../types";

interface ExperienceListFieldWithValidationProps extends ExperienceListFieldProps {
  getFieldError?: (field: string) => string | undefined;
}

export const ExperienceListField = ({ field, formData, onAdd, onRemove, onUpdate, getFieldError }: ExperienceListFieldWithValidationProps) => {
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
        {experiences.map((experience, index) => {
          const positionError = getFieldError?.(`experiences.${index}.position`);
          const companyError = getFieldError?.(`experiences.${index}.company`);
          const startDateError = getFieldError?.(`experiences.${index}.startDate`);
          const endDateError = getFieldError?.(`experiences.${index}.endDate`);
          
          return (
            <div key={index} className="experience-item">
            <input
              className={`mastercv__form-input ${positionError ? 'mastercv__form-input--error' : ''}`}
              type="text"
              value={experience.position}
              onChange={(e) => onUpdate(index, 'position', e.target.value)}
              placeholder="Position"
            />
            {positionError && <div className="mastercv__form-error">{positionError}</div>}
            
            <input
              className={`mastercv__form-input ${companyError ? 'mastercv__form-input--error' : ''}`}
              type="text"
              value={experience.company}
              onChange={(e) => onUpdate(index, 'company', e.target.value)}
              placeholder="Company"
            />
            {companyError && <div className="mastercv__form-error">{companyError}</div>}
            <input
              className={`mastercv__form-input ${startDateError ? 'mastercv__form-input--error' : ''}`}
              type="text"
              value={experience.startDate}
              onChange={(e) => onUpdate(index, 'startDate', e.target.value)}
              placeholder="Start Date (YYYY-MM-DD, MM/YYYY, or YYYY)"
              title="Format: YYYY-MM-DD (2023-01-15), MM/YYYY (01/2023), or YYYY (2023)"
            />
            {startDateError && <div className="mastercv__form-error">{startDateError}</div>}
            
            <input
              className={`mastercv__form-input ${endDateError ? 'mastercv__form-input--error' : ''}`}
              type="text"
              value={experience.endDate}
              onChange={(e) => onUpdate(index, 'endDate', e.target.value)}
              placeholder="End Date (YYYY-MM-DD, MM/YYYY, or YYYY)"
              title="Format: YYYY-MM-DD (2023-01-15), MM/YYYY (01/2023), or YYYY (2023)"
            />
            {endDateError && <div className="mastercv__form-error">{endDateError}</div>}
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
          );
        })}
      </div>
    </div>
  );
};