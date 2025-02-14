import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControl {
  snake: Snake; //实例调用
  foodElement: HTMLElement;
  scorePanel: ScorePanel; //实例调用，写死的数据
  direction: string = "ArrowRight"; // 设置默认方向
  timer: ReturnType<typeof setTimeout> | null = null;
  isLive: boolean = true; //默认游戏没有结束

  constructor( foodId: string, scorePanel: ScorePanel) {
    this.snake=new Snake(); //实例调用
    this.foodElement = document.getElementById(foodId)!;
    this.scorePanel = scorePanel;
    document.addEventListener("keydown", this.handleKeydown.bind(this));
   
    this.init();
    // 监听游戏结束事件
    document.addEventListener("gameOver", () => {
      this.isLive = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    });
  }

  init() {
    document.addEventListener("keydown", (event) => this.keydownHandler(event));
    this.run(); // 开始运行
  }

  keydownHandler(event: KeyboardEvent) {
    //键盘按下事件
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!validKeys.includes(event.key)) return;
    this.direction = event.key;
  }
  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.snake.setDirection("up");
        break;
      case "ArrowDown":
        this.snake.setDirection("down");
        break;
      case "ArrowLeft":
        this.snake.setDirection("left");
        break;
      case "ArrowRight":
        this.snake.setDirection("right");
        break;
    }
  }
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }
    //检查蛇是否吃到了食物
    this.checkEat(X, Y);

    //检查是否撞墙
    if (X < 0 || X > 290 || Y < 0 || Y > 290) {
      alert("Game Over!");
      document.dispatchEvent(new Event("gameOver")); // 触发 gameOver 事件
      return;
    }

    this.snake.X = X;
    this.snake.Y = Y;
    if (!this.isLive) return;
    // 让 `run` 持续运行，速度根据得分级别调整run的速度
    this.timer = setTimeout(
      () => this.run(),
      300 - (this.scorePanel.level - 1) * 30
    );
  }
  //定义一个方法，用来检测蛇是否吃到了食物
  checkEat(X: number, Y: number) {
    if (X === this.foodElement.offsetLeft && Y === this.foodElement.offsetTop) {
      this.scorePanel.addScore();
      this.changeFoodPosition(); // 让食物随机生成新的位置
      this.snake.addBody();
    }
  }
  
  //定义一个方法，用来让食物随机生成新的位置
  changeFoodPosition() {
    const maxX = 290;
    const maxY = 290;
    const newX = Math.floor(Math.random() * (maxX / 10)) * 10;
    const newY = Math.floor(Math.random() * (maxY / 10)) * 10;
    this.foodElement.style.left = `${newX}px`;
    this.foodElement.style.top = `${newY}px`;
  }
}

export default GameControl;
