import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import "./searchbar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: null,
      playerTwoName: null,
      playerStats: [],
      playerStatsTwo: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId();
    console.log(this.state.playerName);
  };
  handleSubmitTwo = (e) => {
    e.preventDefault();
    this.getPlayerIdTwo();
    console.log(this.state.playerTwoName);
  };

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      this.setState({ playerName: replace });
      this.setState({ playerTwoName: replace });
    } else {
      alert("Please type players name!");
    }
  };

  getPlayerId = () => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`
      )
      .then(async (res) => {
        console.log(res.data.data);
        this.playerOne = res.data.data[0]['first_name'];
        if (res.data.data[0] === undefined) {
          alert("This player is either injured or hasn't played yet!");
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!");
        } else {
          await this.getPlayerStats(res.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPlayerIdTwo = () => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?search=${this.state.playerTwoName}`
      )
      .then(async (res) => {
        console.log(res.data.data);
        this.playerTwo = res.data.data[0]['first_name'];
        if (res.data.data[0] === undefined) {
          alert("This player is either injured or hasn't played yet!");
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!");
        } else {
          await this.getPlayerStatsTwo(res.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPlayerStats = (playerId) => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${playerId}`
      )
      .then(async (res) => {
        console.log(res.data.data);
        this.points = res.data.data[0].pts;
        this.rebound = res.data.data[0].reb;
        this.assests = res.data.data[0].ast;
        this.played = res.data.data[0].games_played;
        console.log(this.playerOne)
        console.log(this.rebound);
        console.log(this.points);
        this.setState({ playerStats: res.data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPlayerStatsTwo = (playerIdTwo) => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${playerIdTwo}`
      )
      .then(async (res) => {
        console.log(res.data.data);
        this.pointsTwo = res.data.data[0].pts;
        this.reboundTwo = res.data.data[0].reb;
        this.assestsTwo = res.data.data[0].ast;
        this.playedTwo = res.data.data[0].games_played;
        console.log(this.playerTwo)
        console.log(this.reboundTwo);
        console.log(this.pointsTwo);
        this.setState({ playerStatsTwo: res.data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className='playerOne'>
          <label>
            First Player Name&nbsp; 
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="please enter players name"
            />
            
          </label>
          <input type="submit" value="Submit" className="playerOneSubmit" />
        </form>
        <form onSubmit={this.handleSubmitTwo} className='playerTwo'>
          <label>
            Second Player Name&nbsp;
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="please enter players name"
            />
            
          </label>
          <input type="submit" value="Submit" className='playerTwoSubmit'/>
        </form>

        <div className="stats">
          games played: {this.state.playerStats["games_played"]}
          <br />
          points averaged: {this.state.playerStats["pts"]}
          <br />
          rebounds averaged: {this.state.playerStats["reb"]}
          <br />
          assists averaged: {this.state.playerStats["ast"]}
        </div>
        <div className="statsTwo">
          games played: {this.state.playerStatsTwo["games_played"]}
          <br />
          points averaged: {this.state.playerStatsTwo["pts"]}
          <br />
          rebounds averaged: {this.state.playerStatsTwo["reb"]}
          <br />
          assists averaged: {this.state.playerStatsTwo["ast"]}
        </div>

        <Radar
          height={400}
          width={150}
          options={{ maintainAspectRatio: false }}
          data={{
            labels: ["Games Played", "Points", "Rebounds", "Assists"],

            datasets: [
              {
                label: [this.playerOne],
                backgroundColor: 'rgba(226, 106, 106, 1)', //color of lines
                borderColor: 'red',
                data: [this.played, this.points, this.rebound, this.assests], //data of line
                fill: true,
              },
              {
                label: [this.playerTwo],
                backgroundColor: 'rgba(137, 196, 244, 1)', //color of lines
                borderColor: "blue",
                data: [this.playedTwo, this.pointsTwo, this.reboundTwo, this.assestsTwo], //data of line
                fill: true,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default SearchBar;
