const http = require("http");
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("serve", (msg) => console.log(msg));

const PORT = 3500 || process.env.PORT;

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.writeHead(200, { "Content-Type": "application/js" });
  res.end(console.log("This is the response"));
});

server.listen(PORT, () => {
  emitter.emit("serve", "log to console");
  console.log(`The console is running on port ${PORT}`);
});
