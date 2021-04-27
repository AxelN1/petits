import React from 'react';

class Numdee extends React.Component {
    render() {
        return (
            <div className="numeroDee">

                    <span className="spanP1">{this.state.numDee}</span>
                    <i className="fas fa-chess-knight logo "></i>

                    <span className="spanP2">{this.state.numDee2}</span>
                    <p className="rainbow">Petit Chevaux</p>
                    <button className={this.state.currentPlayer === 1 ? "b1" : "b2"} onClick={this.lancerDee}>Tirer dée du jouer {this.state.currentPlayer}</button>
                  </div>
        )
    }
}

export default Numdee