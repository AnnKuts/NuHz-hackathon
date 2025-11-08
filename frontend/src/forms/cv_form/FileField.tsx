import type { FileFieldProps } from "../types";

export const FileField = ({ field, formData, onFileChange }: FileFieldProps) => {
  return (
    <div key={field.name} className="mastercv__form-group">
      <label className="mastercv__form-label" htmlFor={field.name}>
        {field.label}
      </label>
      <input
        className="mastercv__form-input"
        type="file"
        id={field.name}
        name={field.name}
        onChange={onFileChange}
        accept="image/*"
      />
      {formData[field.name as keyof typeof formData] && (
        <div className="file-preview">
          <p>Selected: {String(formData[field.name as keyof typeof formData])}</p>
        </div>
      )}
    </div>
  );
};