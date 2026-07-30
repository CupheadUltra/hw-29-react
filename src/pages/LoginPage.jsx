import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
      <label> Email <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label> Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginPage;