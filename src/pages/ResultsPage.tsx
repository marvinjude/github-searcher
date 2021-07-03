import { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";

import { Link, useHistory } from "react-router-dom";

import Input from "../components/Input/Input";
import Button from "../components/Button/Buttton";
import ToggleMode from "../components/ToggleMode/ToggleMode";
import UserBox from "../components/UserBox/UserBox";
import Logo from "../components/Logo";
import Select from "../components/Select/Select";

import { useAppContext } from "../App";

import { PER_PAGE } from "../constants";
import { pickXPages } from "../utils";
import Empty from "../components/Empty";

const rotate = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

//Styled components
const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.footerBackgroundColor};
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 0.3s linear;
`;
//Styled components

function dataSorter(data: any) {
  return {
    ...data,
    items: data.items.sort((a: any, b: any) => {
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    }),
  };
}

function ResultsPage() {
  const lastSearchTerm = useRef("");
  let [searchTerm, setSearchTerm] = useState<string>("");
  const [result, setResult] = useState({ items: [], total_count: 0 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const history = useHistory();

  const fetchPage = useCallback(
    async (page: number) => {
      setCurrentPage(page);

      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchTerm}&page=${page}&per_page=${PER_PAGE}&in:login`
        );

        const data = await response.json();

        setLoading(false);

        lastSearchTerm.current = searchTerm;

        if (data.message) {
          throw new Error(data.message);
        } else {
          setError("");
          setResult(dataSorter(data));
        }
      } catch (e) {
        setError(e.message);
      }
    },
    [searchTerm]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "ArrowRight") {
        fetchPage(currentPage + 1);
      }
      if (key === "ArrowLeft") {
        fetchPage(currentPage - 1);
      }
    },
    [currentPage, fetchPage]
  );

  const handleSearch = async (__searchTerm?: string) => {
    searchTerm = __searchTerm ? __searchTerm : searchTerm;

    if (searchTerm.trim() === "") return;

    history.push({
      pathname: "/result",
      search: `?q=${searchTerm}`,
    });

    setCurrentPage(1);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&page=1&per_page=${PER_PAGE}&in:login`
      );

      const data = await response.json();

      setLoading(false);

      lastSearchTerm.current = searchTerm;

      if (data.message) {
        throw new Error(data.message);
      } else {
        setError("");
        setResult(dataSorter(data));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onSearch = async (e: any) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  useEffect(() => {
    const searhTermsFromURL = new URLSearchParams(history.location.search).get(
      "q"
    );

    if (searhTermsFromURL) {
      setSearchTerm(searhTermsFromURL);
      handleSearch(searhTermsFromURL);
    }
  }, [history]);

  return (
    <>
      <div className="top-area">
        <header className="header">
          <form onSubmit={onSearch} className="header__left">
            <Link to="/">
              <Logo />
            </Link>
            <Input
              value={searchTerm}
              type="search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
              }}
              className="mx-10"
              placeholder="Search here"
            />

            <Button
              disabled={searchTerm.trim() === "" || loading}
              loading={loading}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.125 13.125L10.4062 10.4062"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Search
            </Button>
          </form>
          <div className="header__right">
            <ToggleMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </header>

        <main className="main-area">
          <div
            style={{
              display: "flex",

              background: "red",
              justifyContent: "space-between",
            }}
          >
            <div>1000 Search resut</div>
            <div>
              <Select items={["jude"]} onChange={console.log} />
            </div>
          </div>
          {result.items.length > 0 && (
            <div className="main-area__inner">
              {result.items.map(({ login, avatar_url, type }) => (
                <UserBox
                  avatar_url={avatar_url}
                  login={login}
                  type={type}
                  key={avatar_url}
                />
              ))}
            </div>
          )}

          {result.items.length === 0 && !loading && (
            <Empty
              title="I can't find anything"
              subTitle={`no result found ${lastSearchTerm.current && "for “"}${
                lastSearchTerm.current
              }${lastSearchTerm.current && "”"}`}
            />
          )}
        </main>
      </div>
      {result.items.length > 0 && (
        <StyledFooter>
          <button
            onClick={() => fetchPage(Math.max(1, currentPage - 1))}
            className="pagination-item"
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          {pickXPages(
            currentPage,
            result.total_count && Math.ceil(result.total_count / PER_PAGE)
          ).map((pageNumber) => (
            <button
              onClick={() => fetchPage(pageNumber)}
              className={`pagination-item ${
                currentPage === pageNumber && "pagination-item--selected"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => fetchPage(currentPage + 1)}
            className="pagination-item"
          >
            {">>"}
          </button>
        </StyledFooter>
      )}
    </>
  );
}

export default ResultsPage;
