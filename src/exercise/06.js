// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon,PokemonInfoFallback, PokemonDataView } from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary';

// class ErrorBoundary extends React.Component {
//   state = {
//     hasError: false,
//     errorMessage: '',
//   };

//   static getDerivedStateFromError(error){
//     return {hasError:true, errorMessage: error.message};
//   }

//   componentDidCatch(error, info){
//     console.log(`CAUGHT ERROR ${error.message}`)
//   }

//   render(){
//     console.log(`rendering ${this.state.errorMessage}`)
//     if(this.state.hasError){
//       // return this.props.fallback;
//       const fallback = this.state.errorMessage;
//       return fallback;
//     }
//     return this.props.children;
//   }
// }


function PokemonInfo({pokemonName}) {
  console.log("pokemon info called")
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  const [state, setState] = React.useState({status:'idle', pokemon:null})
  const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(()=>{
    console.log("USE EFFECT CALLED BY POKEMON INFO");
    if(pokemonName==='') return;
    // setPokemon(null)
    setState({status:'pending', pokemon:null})
    fetchPokemon(pokemonName).then(pokemonData => {

      // setPokemon(pokemonData);
      setState({status:'resolved', pokemon:pokemonData})

    }, 
    // error=> setError(error),

    ).catch(error => {
      setError(error)
      setState({status:'rejected', pokemon:null})
    })
  }, [pokemonName])
  console.log(error)
  // return pokemonName===''?'Submit a pokemon':(error?error.message:(pokemon?<PokemonDataView pokemon={pokemon} />:<PokemonInfoFallback name={pokemonName} />))
  switch(state.status){
    case 'idle':
    return 'Submit a pokemon'
    case 'rejected':
    // return error.message
    throw error
    case 'resolved':
    return <PokemonDataView pokemon={state.pokemon} />
    default:
    return <PokemonInfoFallback name={pokemonName} />
  }

  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  // return 'TODO'
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    console.log("handling change")
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
       { /* <ErrorBoundary key={pokemonName} fallbackRender={(props)=> props.error.message} ></ErrorBoundary>*/} 
       {/*key remounts the component, note that child will be remounted too if parent remounts*/}
      {/* <ErrorBoundary fallbackRender={(props)=>{
        return <div>{props.error.message} <button onClick={props.resetErrorBoundary}>Try Again</button></div>
      }} onReset={()=> setPokemonName('')} > */}
      <ErrorBoundary resetKeys={[pokemonName]} fallbackRender={(props)=> props.error.message} >

        <PokemonInfo pokemonName={pokemonName} />
      </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
