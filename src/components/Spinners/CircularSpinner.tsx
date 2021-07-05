import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
`;

const StyledSpinner = styled.svg`
  color: white;
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  width: 23px;
  height: 23px;

  .path {
    strokeLinecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

function CircularSpinner() {
  return (
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        stroke="currentColor"
        className="path"
        cx="25"
        cy="25"
        r="15"
        fill="none"
        strokeWidth="4"
      ></circle>
    </StyledSpinner>
  );
}

export default CircularSpinner;
