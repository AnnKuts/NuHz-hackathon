import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Form from '../Form';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const error = 'This field is required';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Form
      label="Username"
      name="username"
      value={username}
      onChange={handleChange}
      error={error}
    />
  );
};

export default LoginForm;