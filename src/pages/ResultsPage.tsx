import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";


import Input from "../components/Input/Input";
import Button from "../components/Button/Buttton";
import ToggleMode from "../components/ToggleMode/ToggleMode";
import UserBox from "../components/UserBox/UserBox";
import Logo from "../components/Logo";

import { useAppContext } from '../App';

import { PER_PAGE } from "../constants";
import { pickXPages } from "../utils";


//Styled components

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.footerBackgroundColor};
  padding: 2rem;
  color: white;
    display: flex;
  align-items: center;
  justify-content: center;
`;
//Styled components



function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [result, setResult] = useState({ items: [], total_count: 0 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { isDarkMode, setIsDarkMode } = useAppContext();

  const fetchPage = useCallback(async (page: number) => {
    setCurrentPage(page);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&page=${page}&per_page=${PER_PAGE}&in:login`
      );

      const data = await response.json();

      setLoading(false);

      if (data.message) {
        throw new Error(data.message);
      } else {
        setError("");
        setResult(data);
      }
    } catch (e) {
      setError(e.message);
    }
  }, [searchTerm]);


  const onKeyUp = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (key === 'ArrowRight') {
      fetchPage(currentPage + 1)
    }
    if (key === 'ArrowLeft') {
      fetchPage(currentPage - 1)
    }
  }, [currentPage, fetchPage]);


  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [onKeyUp])


  const onSearch = async (e: any) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    setCurrentPage(1);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&page=1&per_page=${PER_PAGE}&in:login`
      );

      const data = await response.json();

      setLoading(false);

      if (data.message) {
        throw new Error(data.message);
      } else {
        setError("");
        setResult(data);
      }
    } catch (e) {
      setError(e.message);
    }
  };



  return (
    <>
      <div className="top-area">
        <header className="header">
          <form onSubmit={onSearch} className="header__left">
            <Logo />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
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
            <ToggleMode
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </div>
        </header>
        <main className="main-area" >
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
        </main>
      </div>
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
            className={`pagination-item ${currentPage === pageNumber && "pagination-item--selected"
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
    </>
  );
}

export default ResultsPage;
