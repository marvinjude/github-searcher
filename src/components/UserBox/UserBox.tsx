import { FC } from "react";
import styled from "styled-components";

interface Props {
  avatar_url: string;
  login: string;
  type?: string;
}

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 0.5rem;
  min-height: 160px;
  width: auto;

  transition: 0.3s all ease;
  text-decoration: none;

  &:hover {
    transform: translateY(0.2rem);
  }

  .user-box__avatar {
    border-radius: 0.5rem;
    background-color: #1f0735;
    width: 100%;
  }

  .user-box__login {
    margin-top: 0.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.foregroundColor} !important;
  }

  .user-box__user-type {
    height: 2rem;
    width: 2rem;
    background: #bd6ff18c;
    position: absolute;
    border-radius: 50%;
    bottom: 40px;
    right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserBox: FC<Props> = ({ avatar_url, login, type, ...props }) => {
  return (
    <Wrapper target="_blank" href={`https://github.com/${login}`} {...props}>
      <img className="user-box__avatar" alt={login} src={avatar_url} />
      <span className="user-box__login">{login}</span>
      <div className="user-box__user-type">
        {type === "User" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.6845 14.1014 3.33331 14.9493 3.33331 15.8333V17.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10 2.5C8.15907 2.5 6.66669 3.99238 6.66669 5.83333C6.66669 7.67428 8.15907 9.16667 10 9.16667Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {type === "Organization" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5653 12.8512 11.7174 12.5 10.8334 12.5H4.16671C3.28265 12.5 2.43481 12.8512 1.80968 13.4763C1.18456 14.1014 0.833374 14.9493 0.833374 15.8333V17.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.49996 9.16667C9.34091 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34091 2.5 7.49996 2.5C5.65901 2.5 4.16663 3.99238 4.16663 5.83333C4.16663 7.67428 5.65901 9.16667 7.49996 9.16667Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.1666 17.4999V15.8333C19.1661 15.0947 18.9203 14.3773 18.4678 13.7935C18.0153 13.2098 17.3817 12.7929 16.6666 12.6083"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 2.60828C14.0504 2.79186 14.6859 3.20886 15.1397 3.79353C15.5936 4.37821 15.8399 5.0973 15.8399 5.83744C15.8399 6.57758 15.5936 7.29668 15.1397 7.88135C14.6859 8.46603 14.0504 8.88303 13.3334 9.06661"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
    </Wrapper>
  );
};

export default UserBox;
