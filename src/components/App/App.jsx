import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom'; 
import { refreshUser } from '../../redux/auth/authSlice';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { UserMenu } from '../UserMenu/UserMenu';

const css = {};

const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className={css.container || ''} style={{ padding: 20 }}>
      <header className={css.header || ''} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <nav style={{ display: 'flex', gap: 15 }}>
          <NavLink to="/" className={css.link || ''}>Home</NavLink>
          {isLoggedIn ? (
            <NavLink to="/contacts" className={css.link || ''}>Contacts</NavLink>
          ) : (
            <>
              <NavLink to="/register" className={css.link || ''}>Register</NavLink>
              <NavLink to="/login" className={css.link || ''}>Login</NavLink>
            </>
          )}
        </nav>
        {isLoggedIn && <UserMenu />}
      </header>

      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<div className={css.welcome || ''}>Welcome to Phonebook!</div>} />
          <Route 
            path="/register" 
            element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />} 
          />
          <Route 
            path="/login" 
            element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />} 
          />
          <Route 
            path="/contacts" 
            element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}