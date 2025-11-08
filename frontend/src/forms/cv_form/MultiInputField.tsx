import type { MultiInputFieldProps } from "../types";

export const MultiInputField = ({ field, formData, onAdd, onRemove, onChange }: MultiInputFieldProps) => {
  const items = formData[field.name as keyof typeof formData] as string[] || [];

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
      <div className="multi-input-container">
        {items.map((item, index) => (
          <div key={index} className="multi-input-item">
            <input
              className="mastercv__form-input"
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={field.placeholder}
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