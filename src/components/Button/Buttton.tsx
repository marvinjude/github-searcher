import React, { FC } from "react";
import CircularSpinner from "../Spinners/CircularSpinner";
import styled from "styled-components";
import { device } from "../../themes";

interface Props {
  /*what the fuck is this comment*/
  loading?: boolean;

  disabled?: boolean;
  primary?: boolean;
  small?: boolean;
  rounded?: boolean;

  as?: React.ElementType;
  to?: string;
}

interface StyledButtonProps {
  primary?: boolean;
  small?: boolean;
  rounded?: boolean;
}

const IconButtonWrapper = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.foregroundColor};
  border-radius: 2px;
  line-height: 0;
  font-size: 14px;
  font-size: 12px;
  font-weight: 600;
  padding: 0.5rem;

  &:hover {
    background-color: #80808026 !important;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  padding: 1rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none !important;
  min-width: ${({ small }) => (small ? "5rem" : "7rem")};

  border-radius: ${({ rounded }) => (rounded ? "0.22rem" : "0")};
  background: ${({ primary, theme }) =>
    primary ? theme.primary : "transparent"};
  border: ${({ primary, theme }) =>
    primary ? "transparent" : `1px solid  ${theme.primary}`};

  height: ${({ small }) => (small ? "2.6rem" : "2.8rem")};
  color: ${(props) => (props.primary ? "white" : props.theme.foregroundColor)};

  svg {
    margin-right: 0.2rem;
  }

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryForegroundColor};
  }

  @media ${device.laptop} {
    min-width: ${({ small }) => (small ? "7rem" : "11rem")};
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const Button: FC<Props> = ({ children, loading, ...props }) => {
  return (
    <StyledButton role="button" {...props}>
      {loading ? <CircularSpinner /> : children}
    </StyledButton>
  );
};

export const IconButton: FC = ({ children, ...props }) => {
  return (
    <IconButtonWrapper role="button" {...props}>
      {children}
    </IconButtonWrapper>
  );
};

export default Button;
