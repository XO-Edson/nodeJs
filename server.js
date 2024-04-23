const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errHandler = require("./middleware/errorLog");

const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errHandler);

app.listen(PORT, () => `Server running on port ${PORT}`);
