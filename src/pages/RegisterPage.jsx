import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
      <label> Name <input type="text" value={name} onChange={e => setName(e.target.value)} required /></label>
      <label> Email <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label> Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;