import { useState } from "react";
import { Portal } from "./components/rickandmorty/portal/portal";
import { RickAndMorty } from "./components/rickandmorty/RicksAndMortyCharacters.tsx";

function App() {
  const [showCharacters, setShowCharacters] = useState(false);
  return (
    <>
      {!showCharacters ? (
        <Portal onNavigate={() => setShowCharacters(true)} />
      ) : (
        <RickAndMorty onBack={() => setShowCharacters(false)} />
      )}
    </>
  );
}

export default App;