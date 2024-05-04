var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var ciudad = req.body.ciudad;
  var provincia = req.body.provincia;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'mansillalizamacristian@gmail.com',
    subject: 'Mensaje desde la web de Pelitos Contentos',
    html: nombre + " " + apellido + " se ha comunicado a través de la web con el siguiente mensaje: " + mensaje +", su correo es: " + email + ", su teléfono es: " + tel + ", y nos escribe desde la ciudad de " + ciudad + " provincia de " + provincia + "."
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });

});

module.exports = router;
