import GameControl from "./GameControl";

class Snake {
  head: HTMLElement; //we need the first div of the snake container
  bodies: HTMLCollection; //the snake container includes the head, when there is new div coming, bodies will become longer
  element: HTMLElement; //the snake container

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

    this.head.style.left = `${val}px`;
  }
  set Y(val: number) {
    if (this.Y === val) {
      return;
    }

    this.head.style.top = `${val}px`;
  }
  //When the body increases
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>"); //在结束“标签之前“的位置（即加到最后），传一个div进去
  }
}

export default Snake;
