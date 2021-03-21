import React from 'react';
import './index.css';
import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';


export default function AddPlayers() {
    let ref = useRef(null);
    const [player1, setplayer1] = useState('');
    const [player2, setplayer2] = useState('');
    const dispatch = useDispatch();
    const { players } = useSelector((state) => state.ticToc);

    const startPlay = () => {
        dispatch({ type: 'ADD_PLAYERS', payload: { player1, player2 } })
    };

    return (
        <div className="main-players-div" ref={el => { ref = el }}>

            <div className="players-div">
                <div className="players-div-1">
                    <h1>
                        Welcome to <span>TIC TAC TOE</span>
                    </h1>

                    <div className="input-div">
                        <label ><div className="input-label">Player 1</div></label>
                        <input className="input" type="text" onChange={e => { setplayer1(e.target.value) }} value={player1} />
                    </div>

                    <div className="input-div">
                        <label><div className="input-label">Player 2</div></label>
                        <input className="input" type="text" onChange={e => { setplayer2(e.target.value) }} value={player2} />
                    </div>

                    <div className="button-div">
                        <button onClick={startPlay}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
