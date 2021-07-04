import { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";

import ToggleMode from "../components/ToggleMode/ToggleMode";
import Users, { UserType } from "../components/Users";
import Logo from "../components/Logo";
import Select from "../components/Select/Select";
import Search from "../components/Search/Search";
import Empty from "../components/Empty";

import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

import { useAppContext } from "../App";
import { PER_PAGE } from "../constants";
import { pickXPages, formatNumber, dataSorter } from "../utils";
import File from "../Icons/File";
import fetchUsers from "../service/user.service";


const rotate = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.footerBackgroundColor};
  padding: 1.3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 0.3s linear;
`;

const StyledHeaderArea = styled.div`
  color: ${(props) => props.theme.foregroundColor};
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.borderColor}`};
  position: sticky;
  top: 0;
  z-index: 10;

  .left {
    font-size: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: ${(props) => props.theme.headerBg};

  .header__left {
    display: flex;
    align-items: center;
  }
  .header__right {
    margin-left: auto;
    color: white;
  }
  .mr {
    margin-right: 1rem;
  }
`;
//Styled components

enum sortTypes {
  followers = "followers",
  repositories = "repositories",
  joined = "joined",
}

interface resultProps {
  items: UserType[]
  total_count: number
}

function ResultsPage() {
  const lastSearchTerm = useRef("");

  const [result, setResult] = useState<resultProps>({ items: [], total_count: 0 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [sortType, setSortType] = useState<sortTypes>(sortTypes.repositories);

  const { isDarkMode, setIsDarkMode } = useAppContext();
  const history = useHistory();

  const fetchPage = useCallback(
    async (page: number) => {
      setCurrentPage(page);

      try {
        const data = await fetchUsers({
          sort: sortType,
          q: lastSearchTerm.current,
          page,
        });

        setLoading(false);

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
    [sortType]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "ArrowRight") {
        fetchPage(currentPage + 1);
      }
      if (key === "ArrowLeft") {
        fetchPage(Math.max(1, currentPage - 1));
      }
    },
    [currentPage, fetchPage]
  );

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm.trim() === "") return;

      history.push({
        pathname: "/result",
        search: `?q=${searchTerm}`,
      });

      setCurrentPage(1);

      setLoading(true);

      try {
        const data = await fetchUsers({
          sort: sortType,
          q: searchTerm,
          page: 1,
        });

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
    [sortType, history]
  );

  //------------------------Effects----------------------------------
  //asign page fetcher for arrow key
  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  //Fetch if sortype changes
  useDidUpdateEffect(() => {
    handleSearch(lastSearchTerm.current);
  }, [sortType]);

  //Fetch on new render and when
  useEffect(() => {
    const searhTermsFromURL = new URLSearchParams(history.location.search).get(
      "q"
    );

    if (searhTermsFromURL) {
      handleSearch(searhTermsFromURL);
    }
  }, [history, handleSearch]);
  //------------------------Effects----------------------------------

  return (
    <>
      <StyledHeader>
        <Link className="mr" to="/">
          <Logo />
        </Link>
        <Search
          value={lastSearchTerm.current}
          onSubmit={(value) => handleSearch(value)}
          loading={loading}
        />
        <div className="header__right">
          <ToggleMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </StyledHeader>
      <div className="top-area">
        <main className="main-area">
          {result.items.length > 0 && (
            <>
              <StyledHeaderArea>
                <div className="left">
                  <File />
                  {formatNumber(result.total_count)} Results found
                </div>
                <div>
                  <Select
                    placeholder={sortTypes.joined}
                    items={[
                      sortTypes.followers,
                      sortTypes.repositories,
                      sortTypes.joined,
                    ]}
                    onChange={(sortType) => {
                      setSortType(sortType);
                    }}
                  />
                </div>
              </StyledHeaderArea>
              <div className="main-area__inner">
                <Users items={result.items} />
              </div>
            </>
          )}

          {result.items.length === 0 && !loading && (
            <Empty
              title="I can't find anything"
              subTitle={`no result found ${lastSearchTerm.current && "for “"}${lastSearchTerm.current
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
      )}
    </>
  );
}

export default ResultsPage;
