import { useState, useEffect, useCallback, useRef, memo } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link, useHistory } from "react-router-dom";

import ToggleMode from "../components/ToggleMode/ToggleMode";
import Users, { UserType } from "../components/Users";
import Logo from "../components/Logo";
import Select from "../components/Select/Select";
import Search from "../components/Search/Search";
import Empty from "../components/Empty";
import ErrorPlaceholder from "../components/ErrorPlaceholder";

import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

import { useAppContext } from "../App";
import { useToastContext } from "../components/Toast/Toast";

import { paginationListGenerator, formatNumber, dataSorter } from "../utils";
import File from "../Icons/File";
import api from "../service/api";
import { device } from "../themes";
import { PER_PAGE } from "../constants";

/** Styles
 * ================================== */

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
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 0.3s linear;
  transform: translateY(1px);
`;

const StyledPaginationItem = styled.button<StyledPaginationItemProps>`
  height: 2.8rem;
  width: 2.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  color: white;
  background: ${({ selected, theme }) =>
    selected ? theme.primary : `transparent`};
  font-weight: ${({ selected }) => (selected ? "500" : `normal`)};

  transition: 0.2s all;
  position: relative;

  ${(props) =>
    (props.loading &&
      css`
        &::before {
          position: absolute;
          content: "";
          height: 2.8rem;
          width: 2.8rem;
          left: 0;
          top: 0;
          border-radius: 999px;
          overflow: hidden;
          border: 2px solid #892cdc;
          border-bottom: 2px solid transparent;
          animation-name: rotate;
          animation-duration: 0.7s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `) ||
    css`
      border: 1px solid #892cdc;
    `}

  &:hover {
    background: #892cdc;
    transform: scale(0.9);
  }
`;

const StyledHeaderArea = styled.div`
  color: ${(props) => props.theme.foregroundColor};
  background-color: ${(props) => props.theme.backgroundColor};
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
  transition: revert;

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
  padding: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: ${(props) => props.theme.headerBg};

  @media ${device.laptop} {
    padding: 0.8rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .header__left {
    display: flex;
    align-items: center;
  }
  .header__right {
    margin-left: auto;
    color: white;
    padding-left: 0.5rem;
  }
  .mr {
    margin-right: 1rem;
  }
`;

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .main-area {
    flex: 1 1 0;
    width: 100%;
    overflow: scroll;

    @media ${device.laptop} {
      padding-left: 4rem;
      padding-right: 4rem;
    }

    .main-area__inner {
      padding: 1rem;
      width: 100%;
      overflow: scroll;
      gap: 1rem;
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 1fr));
      grid-auto-flow: row;

      @media ${device.mobileM} {
        grid-template-columns: repeat(3, minmax(100px, 1fr));
      }

      @media ${device.tablet} {
        grid-template-columns: repeat(5, minmax(100px, 1fr));
      }

      @media ${device.laptop} {
        grid-template-columns: repeat(8, minmax(100px, 1fr));
      }
    }
  }
`;
//==================================

/** Type defs
 * ================================== */
enum sortTypes {
  followers = "followers",
  repositories = "repositories",
  joined = "joined",
}

interface StyledPaginationItemProps {
  selected: boolean;
  loading?: boolean;
}

interface resultProps {
  items: UserType[];
  total_count: number;
}
//==================================

function ResultsPage() {
  const lastSearchTerm = useRef("");

  const [result, setResult] = useState<resultProps>({
    items: [],
    total_count: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [sortType, setSortType] = useState<sortTypes>(sortTypes.followers);
  const [pageNumberLoading, setPageNumberLoading] = useState<null | number>(
    null
  );

  const { isDarkMode, setIsDarkMode } = useAppContext();
  const { addToast } = useToastContext();

  const history = useHistory();

  const fetchPage = useCallback(
    async (page: number) => {
      setLoading(true);
      setPageNumberLoading(page);

      try {
        const { data } = await api.fetchUsers({
          sort: sortType,
          q: lastSearchTerm.current,
          page,
        });

        setLoading(false);
        setPageNumberLoading(null);

        if (data.message) {
          throw new Error(data.message);
        } else {
          setError("");
          setCurrentPage(page);
          setResult(dataSorter(data));
        }
      } catch (e) {
        setLoading(false);
        setPageNumberLoading(null);
        setError(e.message);
        if (result.items.length > 1) {
          addToast && addToast(`${e.message}, Please try again`);
        }
      }
    },
    [sortType, addToast, result.items.length]
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
      history.push({
        pathname: "/result",
        search: `?q=${searchTerm}`,
      });

      setCurrentPage(1);

      setLoading(true);

      try {
        const { data } = await api.fetchUsers({
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
        setLoading(false);
        setError(e.message);
        if (result.items.length > 1) {
          addToast && addToast(e.message);
        }
      }
    },
    [sortType, history, addToast, result.items.length]
  );

  /** Effects
   * ================================== */

  //handle navigation with array keys
  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);

    return () => window.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  //Fetch if sortype changes
  useDidUpdateEffect(() => {
    handleSearch(lastSearchTerm.current);
  }, [sortType]);

  //Fetch on new render
  useEffect(() => {
    let mounted = true;
    const searhTermsFromURL =
      new URLSearchParams(history.location.search).get("q") || "";

    // put query in ref
    lastSearchTerm.current = searhTermsFromURL;

    //should cause rerender so we're sure to have `lastSearchTerm.current` rendered

    if (mounted) {
      handleSearch(searhTermsFromURL);
    }

    return () => {
      mounted = false;
    };
  }, [history, handleSearch]);

  //==================================

  return (
    <StyledLayout>
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
      <main className="main-area">
        {result.items.length > 0 && (
          <>
            <StyledHeaderArea>
              <div className="left">
                <File />
                {formatNumber(result.total_count)}{" "}
                {`Result${result.total_count > 1 && "s"}`} found
              </div>
              <div>
                <Select
                  placeholder={sortTypes.followers}
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
            <div className="main-area__inner" data-testid="user-list">
              <Users items={result.items} />
            </div>
          </>
        )}

        {result.items.length === 0 && !loading && !error && (
          <Empty
            title="I can't find anything"
            subTitle={`no result found ${lastSearchTerm.current && "for “"}${
              lastSearchTerm.current
            }${lastSearchTerm.current && "”"}`}
          />
        )}

        {error && result.items.length === 0 && (
          <ErrorPlaceholder
            title={error}
            subTitle={`Please run your search again`}
          />
        )}
      </main>
      {result.items.length > 0 && (
        <StyledFooter>
          <StyledPaginationItem
            selected={false}
            onClick={() => fetchPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || loading}
          >
            {"<<"}
          </StyledPaginationItem>
          {paginationListGenerator(currentPage, result.total_count).map(
            (pageNumber) => (
              <StyledPaginationItem
                loading={pageNumberLoading === pageNumber}
                disabled={loading}
                key={pageNumber}
                selected={currentPage === pageNumber}
                onClick={() => fetchPage(pageNumber)}
              >
                {pageNumber}
              </StyledPaginationItem>
            )
          )}
          <StyledPaginationItem
            selected={false}
            disabled={
              currentPage === Math.ceil(result.total_count / PER_PAGE) ||
              loading
            }
            onClick={() =>
              fetchPage(
                (currentPage + 1) % Math.ceil(result.total_count / PER_PAGE)
              )
            }
          >
            {">>"}
          </StyledPaginationItem>
        </StyledFooter>
      )}
    </StyledLayout>
  );
}

export default memo(ResultsPage);
