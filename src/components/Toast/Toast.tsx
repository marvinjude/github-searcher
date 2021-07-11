import { motion } from "framer-motion";
import styled from "styled-components";
import { FC } from "react";

type ToastProps = { message: string };

const StyledToast = styled.div`
  .inner {
    font-size: 0.9rem;
    position: absolute;
    bottom: 6rem;
    left: 0;
    right: 0;
    width: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    background: ${({ theme }) => theme.footerBackgroundColor};
    border-radius: 5px;
    padding: 0.5rem;
  }
`;

const Toast: FC<ToastProps> = (props) => {
  return (
    <StyledToast>
      <motion.div
        className="inner"
        initial={{ opacity: 0, y: -5, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -5, scale: 0 }}
      >
        <div className="">{props.message}</div>
        <StyledToast>{props.children}</StyledToast>
      </motion.div>
    </StyledToast>
  );
};

export default Toast;
