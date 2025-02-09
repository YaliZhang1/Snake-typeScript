class Food {
  //Define an attribute to represent the element corresponding to the food
  element: HTMLElement;

  
  constructor() {
    this.element = document.getElementById("food")!;
  }
  //Define a method to get the X-axis coordinates of food
  getX(): number {
    return this.element.offsetLeft;
  }
  getY(): number {
    return this.element.offsetTop;
  }
  //Define a method to move the food to a new position
  change() {
    let top = Math.round(Math.random() * 29) * 10; //get the new position from 0-29, and must be Multiples of 10.
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
  }
}

// const food = new Food("food");
// food.change();

export default Food;
