import type { TextFieldProps } from "../types";

export const TextField = ({ field, formData, onChange }: TextFieldProps) => {
  if (field.type === 'textarea') {
    return (
      <div key={field.name} className="mastercv__form-group">
        <label className="mastercv__form-label" htmlFor={field.name}>
          {field.label}
        </label>
        <textarea
          className="mastercv__form-textarea"
          id={field.name}
          name={field.name}
          value={formData[field.name as keyof typeof formData] as string}
          onChange={onChange}
          placeholder={field.placeholder}
          rows={field.rows || 4}
        />
      </div>
    );
  }

  return (
    <div key={field.name} className="mastercv__form-group">
      <label className="mastercv__form-label" htmlFor={field.name}>
        {field.label}
      </label>
      <input
        className="mastercv__form-input"
        type={field.inputType || 'text'}
        id={field.name}
        name={field.name}
        value={formData[field.name as keyof typeof formData] as string}
        onChange={onChange}
        placeholder={field.placeholder}
      />
    </div>
  );
};