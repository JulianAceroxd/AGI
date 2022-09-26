const express=require('express');
const Controller = require('../Controlador/Controller');
const Rutas=express.Router();


Rutas.get('/',Controller.index); 
Rutas.get('/Admin',Controller.admin); 
Rutas.get('/cerrar',Controller.cerrar); 
Rutas.get('/Clientes',Controller.clientes); 
Rutas.get('/Variedades',Controller.Variedades); 
Rutas.post('/RVariedad',Controller.RVariedad); 


Rutas.post('/Logine',Controller.Logine); 

Rutas.get('*',Controller.cuatro); 


module.exports=Rutas;