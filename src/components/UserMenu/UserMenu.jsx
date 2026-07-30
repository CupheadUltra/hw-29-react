import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authSlice';
import PropTypes from 'prop-types';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.user.email);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>{email}</p>
      <button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};