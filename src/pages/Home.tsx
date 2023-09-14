import Logo from "../components/Logo";
import styled from "styled-components";
import Button from "../components/Button/Buttton";
import { Link, useHistory } from "react-router-dom";
import Search from "../components/Search/Search";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -2rem;
  overflow: hidden;
  height: -webkit-fill-available;


  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      line-height: 3;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .button-list {
    display: flex;
    align-items: center;
    justify-content: center;

    & > *{
      margin-left:0.25rem;
      margin-right:0.25rem;
    }
  }
  .footer {
    margin-top: 2rem;
    .label {
      margin-bottom: 0.5rem;
      margin-left:1rem
    }
  }
`;

function Home() {
  const history = useHistory();
  const suggestedSearchTerms: string[] = ['Facebook', 'Google', 'Amazon']

  const handleClick = (value: string) => {
    history.push({
      pathname: "/result",
      search: `?q=${value}`,
    });
  };

  return (
    <Wrapper>
      <div className="top">
        <Logo />
        <h1>Search Across Github</h1>
        <Search onSubmit={(value) => handleClick(value)} loading={false} />
      </div>
    </Wrapper>
  );
}

export default Home;
