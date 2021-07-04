import React, { FC } from "react";
import CircularSpinner from "../Spinners/CircularSpinner";
import styled from "styled-components";

interface Props {
  loading?: boolean;
  disabled?: boolean;
  primary?: boolean;
  small?: boolean;
  rounded?: boolean;
}

interface StyledButtonProps {
  primary?: boolean;
  small?: boolean;
  rounded?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 1rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
 
  padding-left: 3rem;
  padding-right: 3rem;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none !important;

  svg {
    margin-right: 0.2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryForegroundColor};
  }

  border-radius: ${({ rounded }) => (rounded ? "0.22rem" : "0")};;
  background-color: ${({ primary, theme }) => (primary ? theme.primary : "transparent")};
  border: ${({ primary, theme }) => (primary ? "transparent" : `1px solid  ${theme.primary}`)};
  min-width: ${({ small }) => (small ? "7rem" : "11rem")};
  height: ${({ small }) => (small ? "2.6rem" : "2.8rem")};
  color: ${(props) => props.primary ? 'white' : props.theme.foregroundColor};
`;

const Button: FC<Props> = ({ children, loading, ...props }) => {
  return (
    <StyledButton {...props}>
      {loading ? <CircularSpinner /> : children}
    </StyledButton>
  );
};

export default Button;
