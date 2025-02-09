import "./style/index.less";

import GameControl from "./modules/GameControl";
import ScorePanel from "./modules/ScorePanel"; 

const scorePanel = new ScorePanel("scorePanel", "levelPanel", 100, 2);
new GameControl("snake", "food", scorePanel);


