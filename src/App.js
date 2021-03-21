import React from 'react'
import AddPlayers from './AddPlayers';
import { useSelector } from 'react-redux';
import Game from './Game';

function App() {

  const { startgame } = useSelector((state) => state.ticToc);

  return (

    <div className='main'>
      <div className="tictac-icon-div" >
        <img src={`images/TicTacToe.svg`} alt="tictoc"></img>
      </div>
      { !startgame ? <AddPlayers /> : <Game />}
    </div>

  );
}

export default App;
