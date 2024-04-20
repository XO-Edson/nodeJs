//console.log("Nodemon");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
  //console.log(message);
  const dateTime = `${format(new Date(), "yyyymmdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t ${uuid()} \t ${message}\n`;

  //console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs.promises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", fileName),
      logItem
    );

    //console.log("Log appended succesfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;
