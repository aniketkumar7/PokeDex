import { useEffect, useState } from "react";
import Card from "./Card";
import "./main.css";
import Pokemon from "./Pokemon";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Fetch initial Pokemon data
  useEffect(() => {
    const fetchInitialPokemon = async () => {
      try {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
        setPokeDex(result.data);
      } catch (error) {
        console.error("Error fetching initial Pokemon:", error);
      }
    };

    fetchInitialPokemon();
  }, []);

  useEffect(() => {
    const pokeFun = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);

        const pokemonData = await Promise.all(
          res.data.results.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
          })
        );
        setPokeData(pokemonData);
        setFilteredPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
    };

    pokeFun();
  }, [url]);

  // Handle search
  useEffect(() => {
    const filtered = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, pokeData]);

  const handlePokemonClick = (poke) => {
    setPokeDex(poke);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const LoadingCard = () => (
    <div className="loading-card">
      <div className="loading-animation"></div>
    </div>
  );

  return (
    <div className="main">
      <h1 className="title">Pokedex</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="container">
        <div className="left-content">
          {loading ? (
            Array.from({ length: 20 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            <Card
              pokemon={filteredPokemon}
              loading={loading}
              infoPokemon={handlePokemonClick}
            />
          )}

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                  setSearchTerm("");
                }}>
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                  setSearchTerm("");
                }}>
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <div className="poke-card">
            <Pokemon data={pokeDex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
