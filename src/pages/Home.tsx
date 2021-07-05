import Logo from "../components/Logo";
import styled from "styled-components";
import Button from "../components/Button/Buttton";
import { Link, useHistory } from "react-router-dom";
import Search from "../components/Search/Search";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -2rem;

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
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .footer {
    margin-top: 2rem;
    .label {
      line-height: 3;
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
      <div className="footer">
        <div className="button-list">
          {suggestedSearchTerms.map(searchItem => (
            <Link to={`/result?q=${searchItem}`}>
              <Button rounded small>
                {searchItem}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
