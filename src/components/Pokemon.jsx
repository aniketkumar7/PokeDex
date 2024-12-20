import PropTypes from "prop-types";

function Pokemon({ data }) {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="pokemon">
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="abilities">
            <h1>Abilities</h1>

            <div className="ability">
              {data.abilities.map((poke) => {
                return (
                  <>
                    <div className="group">
                      <h2>{poke.ability.name}</h2>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="base-stat">
            {data.stats.map((poke) => {
              return (
                <>
                  <h3 className="stat">
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// props validation
Pokemon.propTypes = {
  data: PropTypes.object,
};
export default Pokemon;
