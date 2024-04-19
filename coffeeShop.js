const EventEmitter = require("events");

class CoffeeShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(coffeeType) {
    this.orderNumber++;
    this.emit("order", coffeeType);
  }

  displayOrder() {
    console.log(`Current order number: ${this.orderNumber}`);
  }
}

module.exports = CoffeeShop;
