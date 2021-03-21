import React from 'react';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import Winner from '../Winner';

export default function Game() {

    const dispatch = useDispatch();
    const { players, numberofwins, winner } = useSelector((state) => state.ticToc);
    const [currentMove, setcurrentMove] = useState('X');
    const [winningResult, setwinningResult] = useState([]);
    const [restartGame, setrestartGame] = useState(false);
    const boxesLeft = useRef(9);
    const [gameresult, setgameresult] = useState('');

    const winningConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    let boxes = {};

    [...Array(9)].forEach((x, i) => {
        boxes['Box_' + (i + 1)] = '';
    });

    const [selectedBoxes, setselectedBoxes] = useState(boxes);

    const selectBox = (boxNumber) => {
        boxesLeft.current = boxesLeft.current - 1;

        let boxIndex = 'Box_' + boxNumber;
        setselectedBoxes((prev) => {
            return { ...prev, [boxIndex]: currentMove }
        });
        setcurrentMove(prev => prev === 'X' ? 'O' : 'X');
    }

    useEffect(() => {

        let tempwinner = '';

        winningConditions.forEach(value => {
            let [a, b, c] = [...value];
            if (selectedBoxes['Box_' + a] !== '' && selectedBoxes['Box_' + b] !== '' && selectedBoxes['Box_' + c] !== '' && selectedBoxes['Box_' + a] === selectedBoxes['Box_' + b] && selectedBoxes['Box_' + b] === selectedBoxes['Box_' + c]) {
                setgameresult(selectedBoxes['Box_' + a]);
                setwinningResult([...value]);
                tempwinner = selectedBoxes['Box_' + a];


                setTimeout(() => {
                    dispatch({ type: 'ADD_WIN', payload: { player: selectedBoxes['Box_' + a] === 'X' ? 'player1' : 'player2' } });
                    setrestartGame(prev => !prev);
                }, 2000);
            }
        });



        if (tempwinner === '' && boxesLeft.current === 0) {
            setgameresult('Draw');
            boxesLeft.current = 9;
            setTimeout(() => {
                setrestartGame(prev => !prev);
            }, 2000);
        }
    }, [selectedBoxes]);

    useEffect(() => {
        let boxes = {};

        [...Array(9)].forEach((x, i) => {
            boxes['Box_' + (i + 1)] = '';
        });

        setgameresult('');
        boxesLeft.current = 9;
        setselectedBoxes(boxes);
        setcurrentMove('X');
        setwinningResult([]);


    }, [restartGame])

    return (
        <div>
            {
                winner === '' ? (
                    <div div className="game-container">
                        <div className="player-1-container">

                            {
                                gameresult === '' || gameresult === 'O' ? <div style={{ textAlign: 'center', color: '#FB9E01', marginBottom: '10px', visibility: currentMove === 'X' && gameresult === '' ? 'visible' : 'hidden' }}>
                                    Your Turn</div> : null
                            }

                            {
                                gameresult === 'X' ? <div className="winner">
                                    Winner</div> : gameresult === 'Draw' ? <div className="draw">
                                    Draw</div> : null
                            }


                            <div className={gameresult === 'X' || gameresult === 'Draw' ? 'player-1 winborder' : 'player-1'}>
                                <p>Player 1</p>
                                <h2>{players.player1}</h2>
                                <div>
                                    <img alt="x-box" width='45px' height="45px" className='x-box' src={'images/close.svg'}></img>
                                </div>
                            </div>
                            <div className="player-numberofwins-div">
                                {
                                    [...Array(6)].map((v, i) => {
                                        let className = 'dot';

                                        if (numberofwins.player1 < i + 1) {
                                            className += ' dot-disable'
                                        }

                                        return <div key={i} className={className}></div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="game-div">
                            <div className="game-div-1">
                                <div className="grid-boxes">

                                    {[...Array(9)].map((x, i) => {

                                        let style = {};
                                        let winner = false;

                                        if (winningResult.indexOf(i + 1) > -1) {
                                            winner = true;
                                        }

                                        if (i === 1 || i === 7) {
                                            style = { border: '2px dashed rgba(245, 245, 245, 0.1)', borderTop: 'none', borderBottom: 'none' }
                                        }

                                        if (i === 3 || i == 5) {
                                            style = { border: '2px dashed rgba(245, 245, 245, 0.1)', borderLeft: 'none', borderRight: 'none' }

                                        }

                                        if (i === 4) {
                                            style = { border: '2px dashed rgba(245, 245, 245, 0.1)' }
                                        }

                                        return (<div className='Box' key={i} style={style} onClick={() => selectedBoxes['Box_' + (i + 1)] === '' && gameresult === '' ? selectBox(i + 1) : null}>
                                            {selectedBoxes['Box_' + (i + 1)] === 'X' ? <img alt='x-box' className='x-box' src={winner ? 'images/yellowclose.svg' : 'images/close.svg'}></img> : selectedBoxes['Box_' + (i + 1)] === 'O' ? <div className='O-box' style={{

                                                borderColor: winner ? 'orange' : '#fff',
                                            }}>

                                            </div> : <div></div>}
                                        </div>)
                                    }

                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="player-2-container">
                            {
                                gameresult === '' || gameresult === 'X' ? <div style={{ textAlign: 'center', color: '#FB9E01', marginBottom: '10px', visibility: currentMove === 'O' && gameresult === '' ? 'visible' : 'hidden' }}>
                                    Your Turn</div> : null
                            }

                            {
                                gameresult === 'O' ? <div className="winner">
                                    Winner</div> : gameresult === 'Draw' ? <div className="draw">
                                    Draw</div> : null
                            }

                            <div className={gameresult === 'O' || gameresult === 'Draw' ? 'player-2 winborder' : 'player-2'}>

                                <p>Player 2</p>
                                <h2>{players.player2} </h2>
                                <div>
                                    <div className='O-box O-box-small'>
                                    </div>
                                </div>
                            </div>

                            <div className="player-numberofwins-div">
                                {
                                    [...Array(6)].map((v, i) => {
                                        let className = 'dot';

                                        if (numberofwins.player2 < i + 1) {
                                            className += ' dot-disable'
                                        }
                                        return <div key={i} className={className}></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : <Winner></Winner>
            }
        </ div>

    )
}
