# Building a Pokémon App with React and Vite

<p> In this guide, we will create a simple Pokémon application using React and Vite. The application will fetch Pokémon data from the PokéAPI and display it in a user-friendly interface. We will structure our application into three main components: Main, Card, and Pokemon.
This application will allow users to view a list of Pokémon, click on a Pokémon card to see detailed information, and navigate through pages of Pokémon using "Previous" and "Next" buttons.</p>

This is a simple Pokémon application built with React and Vite. The app fetches Pokémon data from the PokéAPI and displays it in a user-friendly interface. Users can view a list of Pokémon, click on a Pokémon card for detailed information, and navigate through pages of Pokémon using "Previous" and "Next" buttons.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setting Up the Project](#setting-up-the-project)
- [Creating Components](#creating-components)
  - [Main Component](#main-component)
  - [Card Component](#card-component)
  - [Pokemon Component](#pokemon-component)
- [Fetching Data with Axios](#fetching-data-with-axios)
- [Passing Props](#passing-props)
- [Handling Navigation](#handling-navigation)
- [Styling the Application](#styling-the-application)
- [Conclusion](#conclusion)


## Features
- View a list of Pokémon.
- Click on a Pokémon card to see detailed information.
- Navigate through pages of Pokémon with "Previous" and "Next" buttons.

## Technologies Used
- React
- Vite
- Axios
- CSS

## Setting Up the Project
To get started, set up a new React project using Vite with the following commands:

```bash
npm create vite@latest pokemon-app --template react
cd pokemon-app
npm install
npm install axios
```

## Creating Components

### Main Component
The Main component serves as the main container for the application. It consists of two sections: the left section for displaying Pokémon cards and the right section for showing detailed Pokémon information.


## Main Component Structure
- Define a container which consists of two sections (left and right).
  - **Left Section** consists of:
    - Card Component
    - Button Group (Previous, Next)
  - **Right Section** consists of:
    - Pokémon Information

## Card Component Structure
- Define a div which consists of:
  - Pokémon ID
  - Pokémon Image
  - Pokémon Name

## Pokémon Component Structure
- Define a div which consists of:
  - Pokémon Name
  - Pokémon Image
  - Abilities Group
  - Stats Group

## Fetching Data with Axios

### Install Axios
To install Axios, run:
```bash
npm install axios
```

## Now set the Pokemon data
- To set the pokeon data

`const [pokeData, setPokeData] = useState([]);`

- For loading

`const [loading, setLoading] = useState(true);`

- To set URL

`const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");`

- To set Url for prev

`const [nextUrl, setNextUrl] = useState();`

- To set url for next

`const [prevUrl, setPrevUrl] = useState();`

- To show the pokemon information when the user clicks the pokemon card

`const [pokeDex, setPokeDex] = useState();`


### Now Ftech the data using the API and UseEffect()

- Make a async function `pokeFun()` to fetch data ans call it inside the useEffect
    - set loading true
    - fetch all the data   `const res = await axios.get(url)`
    - set the next url to fetch next 20 pokemon
        - `setNextUrl(res.data.next);`
    - set the prev url to fetch prev 20 pokemon
        - `setNextUrl(res.data.next);`
    - Now Make a function to get the pokemon url of each pokemon and map it
    -  `const pokemonData = await Promise.all( );`
    - Inside it map the map , fetch the url and return the result.
    - `res.data.results.map(async (item) => {
          const result = await axios.get(item.url);
          return result.data;
        })`
    - Now the set the data `setPokeData(pokemonData);`
    - set loading false `setLoading(false);`


### Now passing props to the Component

- In Card Component pass the data
    - `<Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />`
    - Now in Card.jsx , receive the props and render it
        - `const Card = ({ pokemon, loading, infoPokemon}) => {};`
    - Also check for loading and then map the data
    - Add a onclick function on the card to show the pokemon data
    - `<div className="card" key={item.id} onClick={()=>infoPokemon(item)}>`

### Now in Pokemon Component in Right Container

- Pass the data in the Pokemon Component
    - `<Pokemon data={pokeDex} />`
    - Receive the data in `Pokemon.jsx` and map it.
    - First check the data is empty or not and then map it to the internal elements like (name, imageUrl, groups, etc.)
        - `<h1>{data.name}</h1>`

        - `{data.abilities.map((poke) => {
                return (
                  <>
                    <div className="group">
                      <h2>{poke.ability.name}</h2>
                    </div>
                  </>
                );
              })}`
        - `{data.stats.map((poke) => {
              return (
                <>
                  <h3 className="stat">
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              );
            })}`

### Now passing props to the Component for prev and next button

- Check the prevUrl exixts or not then
- Onclick set the pokemon data empty `setPokeData([]);` and set the `prevUrl`

- Check the nextUrl exixts or not then
- Onclick set the pokemon data empty `setPokeData([]);` and set the `nextUrl`



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh