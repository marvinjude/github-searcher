import React, { FC } from 'react';
import styled from 'styled-components'
import { device } from '../../themes';

/** Styles
 * ================================== */
const StyledInput = styled.input`
  background: #c1b5cc38;
  border: none;
  height: 2.8rem;
  padding: 1rem;
  min-width: 0;
  border-radius:0;

  color: ${({ theme }) => theme.foregroundColor};

  @media ${device.laptop}{
    min-width: 20rem;
  }
  
`
//==================================


interface Props {
  className: string;
  placeholder: string;
  onChange: any;
  type: any;
  value?: any;
  defaultValue?: any
}

const Input: FC<Props> = ({ className, ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;




