var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/views/index.html");
})

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

app.listen(port, () => {
  console.log("Node.js is listening");
})