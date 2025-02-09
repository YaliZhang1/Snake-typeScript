import ScorePanel from "./ScorePanel";

class GameControl {
  snakeElement: HTMLElement; //比较灵活
  foodElement: HTMLElement;
  scorePanel: ScorePanel; //实例调用，写死的数据
  direction: string = "ArrowRight"; // 设置默认方向
  timer: ReturnType<typeof setTimeout> | null = null;
  isLive: boolean = true; //默认游戏没有结束

  constructor(snakeId: string, foodId: string, scorePanel: ScorePanel) {
    this.snakeElement = document.getElementById(snakeId)!; //Id方式，后面可以比较灵活
    this.foodElement = document.getElementById(foodId)!;
    this.scorePanel = scorePanel;

    // 确保蛇的 position 是 absolute，非常重要，不然蛇不会动
    this.snakeElement.style.position = "absolute";
    this.snakeElement.style.left = "50px"; //定义蛇在盒子里的初始位置
    this.snakeElement.style.top = "50px";
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

  run() {
    let X = this.snakeElement.offsetLeft;
    let Y = this.snakeElement.offsetTop;

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
    //检查是否撞墙
    if (X < 0 || X > 290 || Y < 0 || Y > 290) {
      alert("Game Over!");
      document.dispatchEvent(new Event("gameOver")); // 触发 gameOver 事件
      return;
    }
    
    this.snakeElement.style.left = `${X}px`;
    this.snakeElement.style.top = `${Y}px`;
    if (!this.isLive) return;
    // 让 `run` 持续运行，速度根据得分级别调整run的速度
    this.timer = setTimeout(
      () => this.run(),
      300 - (this.scorePanel.level - 1) * 30
    );
  }
}

export default GameControl;
