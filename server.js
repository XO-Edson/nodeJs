const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmmiter = new MyEmitter();

myEmmiter.on("log", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  myEmmiter.emit("log", "log event Emitted!");
}, 2000);

/* const EventsEmitter = require("events");

const emitter = new EventsEmitter();

emitter.on("order-coffee", (coffeType) => {
  console.log(`${coffeType} coffee order placed!`);
});

emitter.on("order-coffee", (coffeType) => {
  if (coffeType) console.log("Complementary Croissant!!");
});

emitter.emit("order-coffee", "Flat-white"); */

/* const CoffeeShop = require("./coffeeShop");
const Desserts = require("./dessert");

const myCoffeeShop = new CoffeeShop();
const myDesserts = new Desserts();

myCoffeeShop.on("order", (coffeeType) => {
  console.log(`${coffeeType} coffee order placed!`);
  myDesserts.serveDessert(2);
});

myCoffeeShop.order("Flat-white");
myCoffeeShop.displayOrder();
 */
