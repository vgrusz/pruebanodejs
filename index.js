var express = require("express");

var nodemailer = require("nodemailer");

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
  let textoResaltado = "<span style='color:red; font-weight: bold '> " + parametroRecibido + "</span>";

  let pie = "</div> <br> <a href='/'>Volver a la home</a>   </body> </html>";
  return encabezado + descripcion + textoResaltado + pie;
}

/*
REEMPLAZADO POR app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Hola mundo");
}); */

app.post("/formPost", function (req, res) {
  res.send(imprimirEnPantalla("Se recibió con método POST en /formPost ", req.body.inputDePrueba));
  console.log(req.body);
});

app.get("/usuario/:nombre", function (req, res) {
  res.send(imprimirEnPantalla("Se recibió con método GET en /usuario/:nombre", req.params.nombre));
});

app.get("/formGet", function (req, res) {
  res.send(imprimirEnPantalla("Se recibió con método GET /formGet", req.query.nombre));
});

app.get("/usuario", function (req, res) {
  res.send(imprimirEnPantalla("Se recibió con método GET /usuario/XXXXXXX", req.query.nombre));
});

app.post("/file", function (req, res) {
  res.sendFile("/hello.txt", { root: __dirname });
});

app.post("/trabajoPractico", function (req, res) {
  res.send(
    imprimirEnPantalla(
      "Se recibieron los siguientes datos",
      "<br> NOMBRE: " +
        req.body.nombre +
        " <br> APELLIDO " +
        req.body.apellido +
        " <br> EDAD " +
        req.body.edad +
        " <br> CELULAR " +
        req.body.celular +
        " <br> PAÍS DE NACIMIENTO " +
        req.body.paisDeNacimiento +
        " <br> PAÍS DE RESIDENCIA " +
        req.body.paisDeResidencia
    )
  );
});

app.post("/mail", function (req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "curso.utn2021@gmail.com",
      pass: "cursoutn2021!",
    },
  });

  var mailOptions = {
    from: "curso.utn2021@gmail.com",
    to: req.body.email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(imprimirEnPantalla("Email no enviado", error));
    } else {
      console.log("Email sent: " + info.response);
      res.send(imprimirEnPantalla("Email enviado", info.response));
    }
  });
});
