import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter } from '../../redux/filterSlice';
import css from './Filter.module.css';

export default function Filter() {
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}