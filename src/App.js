import "./App.css";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { all_champion_id, proxyUrl, headers } from "./constants.js";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [championMatches, setChampionMatches] = useState([]);
  const [matchParticipants, setMatchParticipants] = useState([]);

  async function getRiotData() {
    const account = await axios({
      url: `${proxyUrl}https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      headers: headers,
    });
    const response = await axios({
      url: `${proxyUrl}https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${account.data.accountId}`,
      headers: headers,
    });
    const matchId = await axios({
      url: `${proxyUrl}https://euw1.api.riotgames.com/lol/match/v4/matches/${response.data.matches[0].gameId}`,
      headers: headers,
    });

    setChampionMatches(response.data.matches);
    setMatchParticipants(matchId.data.participantIdentities);
    console.log(response.data.matches);
    console.log(matchId);
    console.log(matchId.data.participantIdentities);
    // matchGetter();
  }
  /*
  function matchGetter() {
    championMatches.map((game) => {
      async function getMatchId() {
        const matchId = await axios({
          url: `${proxyUrl}https://na1.api.riotgames.com/lol/match/v4/matches/${game.gameId}`,
          headers: headers,
        });
        console.log(matchId.teams);
      }
      getMatchId();
    });
  }
*/
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search a Summoner..."
        onChange={(e) => setSummonerName(e.target.value)}
        value={summonerName}
      ></input>
      <button onClick={getRiotData}>Search</button>

      <div>
        <div className="championName">
          {championMatches.map((item) => {
            return (
              <ul>
                {all_champion_id[item.champion]}{" "}
                {dayjs(item.timestamp).format("MM-DD-YYYY")}
              </ul>
            );
          })}
        </div>
        <div className="participantNames">
          {matchParticipants.map((person) => {
            return <ul>{person.player.summonerName}</ul>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
