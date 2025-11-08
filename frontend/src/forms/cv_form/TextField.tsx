import type { TextFieldProps } from "../types";

interface TextFieldWithValidationProps extends TextFieldProps {
  error?: string;
}

export const TextField = ({ field, formData, onChange, error }: TextFieldWithValidationProps) => {
  if (field.type === 'textarea') {
    return (
      <div key={field.name} className="mastercv__form-group">
        <label className="mastercv__form-label" htmlFor={field.name}>
          {field.label}
        </label>
        <textarea
          className={`mastercv__form-textarea ${error ? 'mastercv__form-textarea--error' : ''}`}
          id={field.name}
          name={field.name}
          value={formData[field.name as keyof typeof formData] as string}
          onChange={onChange}
          placeholder={field.placeholder}
          rows={field.rows || 4}
        />
        {error && <div className="mastercv__form-error">{error}</div>}
      </div>
    );
  }

  return (
    <div key={field.name} className="mastercv__form-group">
      <label className="mastercv__form-label" htmlFor={field.name}>
        {field.label}
      </label>
      <input
        className={`mastercv__form-input ${error ? 'mastercv__form-input--error' : ''}`}
        type={field.inputType || 'text'}
        id={field.name}
        name={field.name}
        value={formData[field.name as keyof typeof formData] as string}
        onChange={onChange}
        placeholder={field.placeholder}
      />
      {error && <div className="mastercv__form-error">{error}</div>}
    </div>
  );
};