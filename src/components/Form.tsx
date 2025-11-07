import { forwardRef } from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type = "text", value, onChange, error }, ref) => (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
);
