import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "./graphQuery";
import { useState } from "react";
import "./characters.css";
import { CharacterCard, type Character } from "../CharacterCard";

export interface CharactersData {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}

export interface CharactersVars {
  page: number;
  name?: string | null;
}

interface RickAndMortyProps {
  onBack?: () => void;
}

export function RickAndMorty({ onBack }: RickAndMortyProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const isFiltering = searchTerm.trim() !== "";

  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    {
      variables: { page, name: isFiltering ? searchTerm : null },
    }
  );

  if (!data && !loading && error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="characters-container">
      <div className="stars-background"></div>

      {onBack && (
        <button className="back-button" onClick={onBack}>
          Go Back to Portal
        </button>
      )}

      <input
        type="text"
        placeholder="search by name:"
        value={searchTerm}
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
        className="search-input"
      />

      {isFiltering && (
        <button
          className="clear-search-button"
          onClick={() => {
            setSearchTerm("");
            setPage(1);
          }}
        >
          Clear Search
        </button>
      )}

      <h1 className="characters-title">Characters</h1>

      <div className="page-info">
        <span className="page-badge">
          Page {page} of {data?.characters.info.pages ?? "-"}
          {isFiltering && searchTerm && (
            <span className="filter-badge"> - Filtering by: "{searchTerm}"</span>
          )}
        </span>
      </div>

      {data && (
        <CharacterCard
          characters={data.characters}
          loading={loading}
          error={error as Error | undefined}
          isFiltering={isFiltering}
          searchTerm={searchTerm}
        />
      )}

      <div className="pagination">
        <button
          className="pagination-button prev-button"
          onClick={() => setPage(page - 1)}
          disabled={!data?.characters.info.prev || loading}
        >
          Previous
        </button>

        <button
          className="pagination-button next-button"
          onClick={() => setPage(page + 1)}
          disabled={!data?.characters.info.next || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
