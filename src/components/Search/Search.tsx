import { useState } from "react";
import styled from "styled-components";

import Input from "../Input/Input";
import Button from "../Button/Buttton";

interface SearchProps {
  onSubmit: (value: string) => void;
  loading: boolean;
  value?: any;
}

const SearchWrapper = styled.form`
   display: flex;
   border-radius: 0.2rem;
   overflow: hidden;
`;

function Search({ onSubmit, loading, value }: SearchProps) {
  let [searchTerm, setSearchTerm] = useState<string>(value);

  const _onSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(searchTerm);
  };

  return (
    <SearchWrapper onSubmit={_onSubmit}>
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
        primary
        disabled={!searchTerm || loading}
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
    </SearchWrapper>
  );
}

export default Search;
