import React, { FC } from 'react';
import CircularSpinner from '../Spinners/CircularSpinner';

interface Props {
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({ children, loading, ...props }) => {
  return <button className='btn' {...props}>
    {loading ? <CircularSpinner /> : children}
  </button>
};

export default Button;
