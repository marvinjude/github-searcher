import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useToastContext } from "./Toast";

const StyledToastContainer = styled.div`
  .toast {
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
    background: #892cdc;
    border-radius: 5px;
    padding: 0.5rem;
    color: #ffffff;
  }
`;

export const ToastContainer = () => {
  const { messages } = useToastContext();

  return (
    <StyledToastContainer>
      <AnimatePresence>
        {messages?.map((message) => (
          <motion.div
            key={message.id}
            className="toast"
            initial={{ opacity: 0.5, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.5, scale: 0.7 }}
          >
            {message.value}
          </motion.div>
        ))}
      </AnimatePresence>
    </StyledToastContainer>
  );
};
