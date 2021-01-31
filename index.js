var express = require("express");

var app = express();

data =
  "<!DOCTYPE html> <html lang='en'>   <head>     <meta charset='UTF-8' />     <meta name='viewport' content='width=device-width, initial-scale=1.0' />     <title>Prueba node</title>   </head>   <body>     <div>Hola mundo</div>   </body> </html>";

app.get("/", function (req, res) {
  res.send(data);
});

puerto = process.env.PORT || 3000;

app.listen(puerto, function () {
  console.log("app listening on port 3000");
});
