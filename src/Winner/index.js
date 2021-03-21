import React from 'react'
import './index.css';
import { useSelector } from 'react-redux';

export default function Winner() {
    const { players, numberofwins, winner } = useSelector((state) => state.ticToc);

    return (
        <div className="winner-container">
            <div className="winner-main-div">
                <div className="winner-inner-div">
                    <div className="winner-text">Winner</div>

                    <div className="winner-name-div">

                        <div className="winner-player">
                            {winner === 'player1' ? 'Player 1' : 'Player 2'}
                        </div>

                        <div className="winner-name">
                            {
                                players[winner]
                            }
                        </div>

                        <div className="winner-svg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {

                                winner === 'player1' ? <img alt="x-box" src='images/close.svg'></img> : <div className='O-box' style={{
                                    width: '60px', height: '60px', border: ' 8px solid',
                                    borderRadius: '50%',
                                    borderColor: '#fff',
                                }}>
                                </div>
                            }
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}
