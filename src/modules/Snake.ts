import GameControl from "./GameControl";

class Snake {
  head: HTMLElement; //we need the first div of the snake container
  bodies: HTMLCollection; //the snake container includes the head, when there is new div coming, bodies will become longer
  element: HTMLElement; //the snake container
  private direction: "up" | "down" | "left" | "right" = "right"; // 默认向右

  constructor() {
    this.element = document.getElementById("snake")!; //get the snake container div
    this.head = document.querySelector("#snake>div")!; //use querySelector to get the first div inside of snake container
    this.bodies = this.element.getElementsByTagName("div"); //get all divs in bodies
  }

  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //Set the coordinates of the snake head
  set X(val: number) {
    if (this.X === val) {
      return; //if the value is queued the new value, return, doesn't need to change.
    }
    //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (this.direction === "right" && val < this.X) return;
    if (this.direction === "left" && val > this.X) return;
    this.head.style.left = `${val}px`;
    this.moveBody(); //move the body after the head moves.
  }
  set Y(val: number) {
    if (this.Y === val) {
      return;
    }
    if (this.direction === "down" && val < this.Y) return;
    if (this.direction === "up" && val > this.Y) return;
    this.head.style.top = `${val}px`;
    this.moveBody();
  }
  //
  //When the body increases
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>"); //在结束“标签之前“的位置（即加到最后），传一个div进去
  }
  //添加一个蛇身体移动的方法
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let left = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let top = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = `${left}px`;
      (this.bodies[i] as HTMLElement).style.top = `${top}px`;
    }
  }
  checkHeadBody(){
    //check if the snake head hit the body 
    for (let i = 1; i < this.bodies.length; i++) {
      if (
        this.head.offsetLeft === (this.bodies[i] as HTMLElement).offsetLeft &&
        this.head.offsetTop === (this.bodies[i] as HTMLElement).offsetTop
      ) {
        return true;
      }
    }
    const maxX = 290;
    const maxY = 290;
    if (
      this.head.offsetLeft < 0 ||
      this.head.offsetLeft > maxX ||
      this.head.offsetTop < 0 ||
      this.head.offsetTop > maxY
    ) {
      return true;
    }
    return false;
  }
  //Set the snake direction
  setDirection(newDirection: "up" | "down" | "left" | "right") {
    // 避免掉头
    if (
      (this.direction === "left" && newDirection === "right") ||
      (this.direction === "right" && newDirection === "left") ||
      (this.direction === "up" && newDirection === "down") ||
      (this.direction === "down" && newDirection === "up")
    ) {
      return;
    }
    this.direction = newDirection;
  }
}

export default Snake;
