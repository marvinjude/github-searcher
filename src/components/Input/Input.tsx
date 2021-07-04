import React, { FC } from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
  background: #c1b5cc38;
  border: none;
  height: 2.8rem;
  padding: 1rem;
  min-width: 20rem;
  color: ${({ theme }) => theme.foregroundColor};
  
`

interface Props {
  className: string;
  placeholder: string;
  onChange: any;
  type: any;
  value: any;
}

const Input: FC<Props> = ({ className, ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;




