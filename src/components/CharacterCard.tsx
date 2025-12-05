import type { CharactersData } from "./rickandmorty/RicksAndMortyCharacters";

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string ;
  origin: { name: string };
  location: { name: string };
}

interface CharacterCardProps {
  characters: CharactersData["characters"];
  loading: boolean;
  error?: Error;
  isFiltering: boolean;
  searchTerm: string;
}

export function CharacterCard({
  characters,
  loading,
  error,
  isFiltering,
  searchTerm,
}: CharacterCardProps) {
  if (loading && !characters.results.length) {
    return (
      <div className="characters-grid-loading">
        <p className="loading-text">
          {isFiltering
            ? `Searching for "${searchTerm}"...`
            : "Loading characters..."}
        </p>
      </div>
    );
  }

  if (!loading && !characters.results.length) {
      return (
          <div className={'no-results-container'}>
              <img src="/nothing.png"
                   alt={"No Results"}
                   className={"no-results-image"}
              />
              <p className={"no-results-text"}>
                  Nothing was left
              </p>
          </div>
      )
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="characters-grid">
      {characters.results.slice(0, 20).map((character: Character) => (
        <div key={character.id} className="character-card">
          <div
            className={`status-badge status-${character.status.toLowerCase()}`}
          >
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
              <strong>gender:</strong> {character.gender}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}