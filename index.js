var express = require("express");

var app = express();

var puerto = process.env.PORT || 3000;

app.use(express.static("public"));

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.listen(puerto, function () {
  console.log("app listening on port " + puerto);
});

function imprimirEnPantalla(descripcion, parametroRecibido) {
  let encabezado =
    "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8' /> <title>Prueba node</title>   </head>   <body>     <div>";
  let textoResaltado =
    "<span style='color:red; font-weight: bold '> " +
    parametroRecibido +
    "</span>";

  let pie = "</div>   </body> </html>";
  return encabezado + descripcion + textoResaltado + pie;
}

/* data =
  "<!DOCTYPE html> <html lang='en'>   <head>     <meta charset='UTF-8' />     <meta name='viewport' content='width=device-width, initial-scale=1.0' />     <title>Prueba node</title>   </head>   <body>     <div>Hola mundo</div>   </body> </html>";

app.get("/", function (req, res) {
  res.send(data);
}); */

app.post("/form", function (req, res) {
  res.send(
    imprimirEnPantalla(
      "Se recibió con método POST en /form ",
      req.body.inputDePrueba
    )
  );
  console.log(req.body);
});

app.get("/usuario/:nombre", function (req, res) {
  res.send(
    imprimirEnPantalla(
      "El parámetro recibido mediante GET con http://localhost:3000/usuario/XXXXXXXXX es ",
      req.params.nombre
    )
  );
});

app.get("/usuario", function (req, res) {
  res.send(
    imprimirEnPantalla(
      "El parámetro recibido mediante GET con http://localhost:3000/usuario?nombre=XXXXXXXXX es ",
      req.query.nombre
    )
  );
});
