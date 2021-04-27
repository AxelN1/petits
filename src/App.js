import React from "react";
import './App.css'
import Circle from "./components/Circle.jsx"
import Winner from "./assets/pic/winner.gif"
import Numdee from "./components/Numdee.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      numDee: 0,
      numCase: 0,
      numDee2: 0,
      numCase2: 0,
      player1Tokens: [false, false, false, false],
      player2Tokens: [false, false, false, false],
      currentPlayer: 1

    }

    this.lancerDee = this.lancerDee.bind(this)
    this.renderVictory = this.renderVictory.bind(this)
  }


// Création de la fonction lancerDee qui renvoi un nombre aléatoire entre 1 et 6
  lancerDee() {
    const dee = Math.floor(Math.random() * 6 + 1)
    console.log("numDEE :", dee);

    // Création de la constante player qui recoit la valeur du state currentPlayer
    const player = this.state.currentPlayer

    // Si player (currentPlayer === 1)
    if (player === 1) {

      // Si le state numCase est different de 0, ou dee (le nombre aléatoire) est égal à 6
      if (this.state.numCase !== 0 || dee === 6) {
      // Les states suivantes changent:
      /* numDee: 0 devient numDee: dee
      numCase: 0 devient numCase: this.state.numCase + dee
      currentPlayer: 1 devient currentPlayer: 2*/
        this.setState({
          numDee: dee,
          numCase: this.state.numCase + dee,
          currentPlayer: 2
        })
      } 
      // Sinon Les states suivantes changent:
      /* numDee: 0 devient numDee: dee
      currentPlayer: 1 devient currentPlayer: 2*/
      else {
        this.setState({
          numDee: dee,
          currentPlayer: 2
        })
      }


    } 
    // Sinon si player (currentPlayer === 2)
    else if (player === 2) {
      // Si le state numCase2 est different de 0, ou dee (le nombre aléatoire) est égal à 6
      if (this.state.numCase2 !== 0 || dee === 6) {
        // Les states suivantes changent:
      /* numDee: 0 devient numDee2: dee
      numCase2: 0 devient numCase: this.state.numCase2 + dee
      currentPlayer: 1 reste currentPlayer: 1*/
        this.setState({
          numDee2: dee,
          numCase2: this.state.numCase2 + dee,
          currentPlayer: 1
        })
      } 
      // Sinon Les states suivantes changent:
      /* numDee2: 0 devient numDee2: dee
      currentPlayer: 1 reste currentPlayer: 1*/
      else {
        this.setState({
          numDee2: dee,
          currentPlayer: 1
        })
      }

    }
  }

  // Création de la fonction renderCircles qui renvoi les paramètres n et p
  renderCircles(n, p) {
    // Création d'une variable circlesArray qui renvoi un tableau vide
    let circlesArray = []

    // Création d'une boucle for qui crée une variable index et lui attribut la valeur du 1er paramètre n, puis si la varible index est
    // inférieur ou égal au 2ème paramètre p, puis l'incrémentation de la variable index
    for (let index = n; index <= p; index++) {

      // Si le state numCase2 est égal à index
      if (this.state.numCase2 === index) {

      // Dans la variable circlesArray qui était vide, on ajoute le rendu du component Circle.jsx et on l'appel avec un index comme clé un code couleur rouge
        circlesArray.push(<Circle key={index} circleColor="#ec4444" />)
      } 

      // Sinon si le state numCase est égal à index
      else if (this.state.numCase === index) {

      // Alors, dans la variable circlesArray qui était vide, on ajoute le rendu du component Circle.jsx et on l'appel avec index comme clé et un code couleur bleu
        circlesArray.push(<Circle key={index} circleColor="#4480ec" />)
      } 

      // Sinon, dans la variable circlesArray qui était vide, on ajoute le rendu du component Circle.jsx et on l'appel avec index comme clé et une couleur black dans la variable circlesArray qui était vide
      else {
        circlesArray.push(<Circle key={index} circleColor="black" />)
      }

      // Si le state numCase est supérieur à 37
      if (this.state.numCase > 37) {
        const arrayTokens = [...this.state.player1Tokens]
        const indexFirstFalse = arrayTokens.indexOf(false)

        arrayTokens[indexFirstFalse] = true

        this.setState({

          numCase: 1,
          player1Tokens: arrayTokens
        })
      } else if (this.state.numCase2 > 37) {
        const arrayTokens2 = [...this.state.player2Tokens]
        const indexSecondFalse = arrayTokens2.indexOf(false)

        arrayTokens2[indexSecondFalse] = true

        this.setState({
          numCase2: 1,
          player2Tokens: arrayTokens2

        })

      }

    }

    return circlesArray
  }

  renderVictory() {
    if (this.state.player1Tokens.indexOf(false) === -1) {
      return (<div className="winner" >
        <p className="pWins"> <span className="spanP1">Player 1</span> Wins !</p>
        <div className="offset-3" style={{ background: `url(${Winner})`, height: `${500}px`, backgroundRepeat: "no-repeat" }} />
      </div>)
    } else if (this.state.player2Tokens.indexOf(false) === -1) {
      return (<div className="winner" >
        <p className="pWins"> <span className="spanP2">Player 2</span> Wins !</p>
        <div className="offset-3" style={{ background: `url(${Winner})`, height: `${500}px`, backgroundRepeat: "no-repeat" }} />
      </div>)

    } else {
      return (

        <div className=" bg-g">
          <div className="offset-2 py-4">
            <div id="jeu">

              <div className="grid-game">

                {this.renderCircles(1, 1)}

                <div className="flex">
                  {this.renderCircles(2, 9)}
                </div>

                {this.renderCircles(10, 10)}

                <div className="flex grid-item-4">
                  {this.renderCircles(29, 36)}
                </div>

                <div className="flex grid-item-5">

                  <div className="containerP1">
                    <div className="divchildP1">
                      <div >
                        <Circle circleColor={this.state.player1Tokens[0] ? "#4646e8" : "black"} />
                        <Circle circleColor={this.state.player1Tokens[1] ? "#4646e8" : "black"} />
                      </div>

                      <div >
                        <Circle circleColor={this.state.player1Tokens[2] ? "#4646e8" : "black"} />
                        <Circle circleColor={this.state.player1Tokens[3] ? "#4646e8" : "black"} />
                      </div>
                    </div>

                   <div className="containerP2">
                    <div className="divchildP2">
                      <div >
                        <Circle circleColor={this.state.player2Tokens[0] ? "#c30c0c" : "black"} />
                        <Circle circleColor={this.state.player2Tokens[1] ? "#c30c0c" : "black"} />
                      </div>

                      <div >
                        <Circle circleColor={this.state.player2Tokens[2] ? "#c30c0c" : "black"} />
                        <Circle circleColor={this.state.player2Tokens[3] ? "#c30c0c" : "black"} />
                      </div>
                    </div>
                  </div>
                  </div>
                  <div>
                    
                  <Numdee/>
                  </div>
                  
                  {/* <div className="numeroDee">


                    <span className="spanP1">{this.state.numDee}</span>
                    <i className="fas fa-chess-knight logo "></i>

                    <span className="spanP2">{this.state.numDee2}</span>
                    <p className="rainbow">Petit Chevaux</p>
                    <button className={this.state.currentPlayer === 1 ? "b1" : "b2"} onClick={this.lancerDee}>Tirer dée du jouer {this.state.currentPlayer}</button>
                  </div> */}

                </div>

                <div className="flex grid-item-6">
                  {this.renderCircles(11, 18)}
                </div>

                {this.renderCircles(28, 28)}

                <div className="flex grid-item-8">
                  {this.renderCircles(20, 27)}
                </div>

                {this.renderCircles(19, 19)}

              </div>

            </div>
          </div>
        </div>
      )
    }
  }

  render() {

    return (
      <div>{this.renderVictory()}</div>
    )
  }

}



export default App

