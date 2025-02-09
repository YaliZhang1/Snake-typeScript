import "./style/index.less";

import GameControl from "./modules/GameControl";
import ScorePanel from "./modules/ScorePanel";
import Snake from "./modules/Snake";

const scorePanel = new ScorePanel("scorePanel", "levelPanel", 100, 2);
const snake = new Snake();
new GameControl( "food", scorePanel);
