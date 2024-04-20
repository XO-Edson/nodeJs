const http = require("http");
const EventEmitter = require("events");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const emitter = new EventEmitter();

emitter.on("serve", (msg) => console.log(msg));

const PORT = 4500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(filePath, contentType);
    response.end(rawData);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
  }
};

const server = http.createServer((req, res) => {
  const extention = path.extname(req.url);
  let contentType;

  if (extention === ".html") {
    contentType = "text/html";
  } else if (extention === ".txt") {
    contentType = "plain/text";
  } else {
    contentType = "text/html";
  }

  const filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "plain/text" && req.url === "/data*"
      ? path.join(__dirname, "data", "data.txt")
      : path.join(__dirname, "views", "404.html");

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
  }
  /*  if (req.url === "/") {
    // Serve the index.html file
    const filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // Handle other request URLs
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  } */
});

server.listen(PORT, () => {
  emitter.emit("serve", `Server started on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
