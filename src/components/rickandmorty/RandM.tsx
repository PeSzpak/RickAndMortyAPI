import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "./graphQuery";
import { useState } from "react";
import './characters.css';

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: {name: string};
  origin: { name: string };
  location: { name: string };
}

interface CharactersData {
  characters: {
    info: {
      count: number
      pages: number
      next: number | null
      prev: number | null 
    }
    results: Character[]
  }
}

interface CharactersVars {
  page: number
}

interface RickAndMortyProps {
  onBack?: () => void;
}

export function RickAndMorty({ onBack }: RickAndMortyProps) {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error.message}</p>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="loading-container">
        <p className="loading-text">No data</p>
      </div>
    );
  }

  return (
    <div className="characters-container">
      <div className="stars-background"></div>

      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Back to Portal
        </button>
      )}
      
      <h1 className="characters-title">Characters</h1>

      <div className="page-info">
        <span className="page-badge">
          Page {page} of {data.characters.info.pages}
        </span>
      </div>

      <div className="characters-grid">
        {data.characters.results.slice(0, 20).map((character: Character) => (
          <div key={character.id} className="character-card">
            <div className={`status-badge status-${character.status.toLowerCase()}`}>
              {character.status}
            </div>
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <h3 className="character-name">{character.name}</h3>
            <div className="character-info">
              <p className="character-detail">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="character-detail">
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p className="character-detail">
                <strong>episode:</strong> {character.episode.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button prev-button"
          onClick={() => setPage(page - 1)}
          disabled={!data.characters.info.prev}
        >
          Previous
        </button>
        
        <button
          className="pagination-button next-button"
          onClick={() => setPage(page + 1)}
          disabled={!data.characters.info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
