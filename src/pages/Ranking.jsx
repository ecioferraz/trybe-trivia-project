import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { readLocalStorage } from '../services/util';
import '../style/ranking.css';

class Ranking extends Component {
  render() {
    const players = readLocalStorage('ranking').sort((a, b) => b.score - a.score);
    return (
      <div className="ranking">
        <div className="rank2">
          <h2 data-testid="ranking-title">Ranking</h2>
          <div className="ranking-list">
            <ol className="lista">
              {players.map((player, index) => (
                <li key={ index } className="op">
                  <p className="posi">{ `${index + 1}º` }</p>
                  <img
                    src={ player.picture }
                    data-testid="header-profile-picture"
                    alt="gravatar"
                  />
                  <p data-testid={ `player-name-${index}` }>{ player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </li>
              ))}
            </ol>
          </div>
          <Link to="/trybe-trivia-project/">
            <button type="button" data-testid="btn-go-home">Inicio</button>
          </Link>
        </div>
        <footer className="image-credit">
          {'Background image credit: '}
          <a href="https://www.pexels.com/pt-br/@sliceisop?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">
            Guillaume Meurice
          </a>
        </footer>
      </div>
    );
  }
}

export default Ranking;
