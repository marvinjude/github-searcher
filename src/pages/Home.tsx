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
          <Link to="/result?q=facebook">
            <Button rounded small>
              Facebook
            </Button>
          </Link>
          <Link to="/result?q=Scalio">
            <Button rounded small>
              Scalio
            </Button>
          </Link>
          <Link to="/result?q=Jude">
            <Button rounded small>
              Jude
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
