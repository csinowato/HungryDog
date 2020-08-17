const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );
};

startListening();
