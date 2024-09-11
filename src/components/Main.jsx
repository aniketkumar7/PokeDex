import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card'
import './main.css'
import Pokemon from './Pokemon';
import axios from 'axios';

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();


  useEffect(() => {
    const pokeFun = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    pokeFun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  // Clear the current list of pokemons
                  setPokeData([]);
                  // Set the URL to the previous page of pokemons
                  setUrl(prevUrl);
                }}>
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}>
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <div className='poke-card'>
            <Pokemon data={pokeDex} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;