const express = require('express');
const productos = require('./api/productos');
//const instacncia = new productos();
// creo una app de tipo express
const app = express();
const handlebars = require("express-handlebars")
const productosRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('views', './views');
// se indica el motor de plantillas a utilizar
app.set('view engine', 'pug');

app.use('/static', express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.render('hello.pug', { mensaje: 'Usando Pub JS desde express'});
});

// completar el codigo...
productosRouter.get('/productos/listar', (req, res) => {
  return res.send(productos.listar());
});

productosRouter.get('/productos/listar/:id', (req, res) => {
  return res.json(productos.listarPorId(req.params.id));
});

productosRouter.post('/productos/guardar', (req, res) => {
  return res.json(productos.guardar(req.body))
});
productosRouter.delete('/productos/borrar/:id', (req, res) => {
    return res.json(productos.borrar(req.params.id));
});

productosRouter.put('/productos/actualizar/:id', (req, res) => { 
    return res.json(productos.actualizar(req.params.id, req.body));
});

productosRouter.get('/productos/vista', (req, res) => {
  let lista = productos.listar();
  if(!lista.error){
      res.render('table', {pple:lista});
    }else{
      res.render('table', { hayProductos: false , titulo: "todos los productos"});
    }
});
app.use('/api', productosRouter);
// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
