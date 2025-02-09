class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  maxLevel: number;
  upScore: number;

  //Define a constructor to initialize the score and level elements. Also, define a method to level up the game.
  // The constructor also takes the IDs of the score and level elements as parameters.
  // The maxLevel parameter is optional and defaults to 10.

  constructor(
    scoreEleId: string,
    levelEleId: string,
    maxLevel: number = 10,
    upScore: number = 10 // The points needed to level up. The default value is 10.also you can change it by external call instantiation
  ) {
    //声明并定义了其属性类型
    this.scoreEle = document.getElementById("score")!;
    if (!this.scoreEle){
      throw new Error(`Element with id "${scoreEleId}" not found.`);
    }
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
   
  }

  addScore() {
    this.score++;
    this.scoreEle.innerText = ` ${this.score}`;
    if (this.score % this.upScore === 0) {
      //levelUp every this.upScore
      this.levelUp();
    }
  }
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerText = ` ${this.level}`;
    }
  }
}
//   const scorePanel = new ScorePanel("score", "level", 100, 2);
//Pass the actual parameters directly in order
//   for (let i = 0; i < 200; i++) {
//     scorePanel.addScore();
//   }
export default ScorePanel;
