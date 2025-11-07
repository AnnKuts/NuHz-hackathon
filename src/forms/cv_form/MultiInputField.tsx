import type { MultiInputFieldProps } from "../types";

export const MultiInputField = ({ field, formData, onAdd, onRemove, onChange }: MultiInputFieldProps) => {
  const items = formData[field.name as keyof typeof formData] as string[] || [];

  return (
    <div className="mastercv__form-group">
      <label className="mastercv__form-label">{field.label}</label>
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
            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={onAdd}
        >
          Add {field.label}
        </button>
      </div>
    </div>
  );
};