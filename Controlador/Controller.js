const Connection = require("../Conexion/Conexion"); //ACA REQUERIMOS LA CONEXION DE BASE DE DATOS PARA LAS CONSULTAS
const cnn = Connection(); //ACA POR MEDIO DE LA CONSTANTE CNN VAMOS A CONTENER LA CONEXION A LA BD
const { render } = require("ejs"); //ACA RENDERISAMOS LOS EJS PARA LA HORA DE HACER RENDERS LOS TOME CORRECTAMENTE
const bcryptjs = require("bcryptjs"); //LLAMAMOS EL MODULO DE INCRIPTACION DE CLAVES ANTERIORMENTE INSTALADO
const Controller = {}; //HACEMOS INICIALIZAMOS EL CONTROLADOR
const express = require("express");
const app = express(express);

Controller.index = (req, res, next) => {
  res.render("Login"); //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
  res.send("ERROR DE CONTROLADOR");
};

Controller.cuatro = (req, res) => {
 res.render('404')

};


Controller.admin = (req, res, next) => {
    if(req.session.Login){
    res.render("admin",{
        login:true,
        name: req.session.nombre
    });
}else{
    console.log("DATOS INCORRECTOS"); //SALIMOS DEL IF DE ENTRADA Y SWITCH A UN VALIDADOR SI LOS DATOS SON INCORRECTOS
    res.render("Login",{
        alert:true,
        alertTitle:"Error",
        alertMessage: "DEBE INICIAR SESION",
        alertIcon: "error",
        showConfirmButton: true,
        timer: 2000,
        ruta: '/'
    });
}
  };

Controller.Logine = async (req, res, next) => {
  //LOGINN
  const usu = await req.body.Usuario; // TRAEMOS LOS NAME DE EL LOGIN PARA VALIDAR LOS CAMPOS
  const cla = await req.body.Clave;
  console.log(usu, cla);
  cnn.query(
    "SELECT * FROM TbUsuarios WHERE Usuario=?",
    [usu],
    async (err, results) => {
      //CONSULTAMOS LOS DATOS EN LA BASE DE DATOS Y REEMPLAZAMOS VALORES CON LOS QUE DILIGENCIA EL USUARIO
      if (err) {
        next(new Error(res.redirect('/'),console.log("ERROR AL REALIZAR LA CONSULTA"), err)); //VALIDAMOS SI EXITEN ERRORES
      } else if (results != 0 && (await (cla, results[0].Clave))) {
        // SI EL RESULTADO ES DIFERENTE DE 0 ES QUE ENCONTRO EL USUARIO,POR MEDIO DE UN ARREGLO Y COMPARE, COMPARAMOS LO DILIGENCIADO POR EL USUARIO Y LO REGISTRADO EN LA BD                           console.log("Datos Correctossssssss");

        //CREAMOS SESIONES POR MEDIO DE UN ARREGLO, QUE NOS RETORNA LOS DATOS DE EL USUARIO LOGEADO
        req.session.Login = true;
       const Nombre = results[0].Nombre;
        Apellido = results[0].Apellido;

        Rol = results[0].Rol;
        console.log(Nombre + Apellido + Rol); //GENERAMOS LA SESION AL DARLE COMO TRUE EN VERDADERA.

        switch (Rol) {
          case 1:
           req.session.nombre = Nombre;
            res.render('Login',{
                alert:true,
                alertTitle:"Conexion Exitosa",
                alertMessage: "Bienvenido "+ req.session.nombre,
                alertIcon: "success",
                showConfirmButton: true,
                timer: 2500,
                ruta: 'Admin'
            });
            break;
          case "2":
            res.redirect("Ventas");
            break;
          case "3":
            res.redirect("Area");
        }
      } else {
        console.log("DATOS INCORRECTOS"); //SALIMOS DEL IF DE ENTRADA Y SWITCH A UN VALIDADOR SI LOS DATOS SON INCORRECTOS
        res.render("Login",{
            alert:true,
            alertTitle:"Error",
            alertMessage: "Usuario O Clave Incorrecto",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 2000,
            ruta: '/'
        }); //NOS REDIRIGE AL MISMO ARCHIVO
      }
    }
  );
};


Controller.cerrar = (req, res, next) => {
req.session.destroy(()=>{
  res.redirect('/')
})
};

module.exports = Controller;
