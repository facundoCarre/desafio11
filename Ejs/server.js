const express = require('express');
const app = express();
const productos = require('./api/productos');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productosRouter = express.Router();
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('formulario', { productos:productos.listar()} );
});

// completar el codigo...
productosRouter.get('/productos/listar', (req, res) => {
    return res.send(productos.listar());
  });
  
  productosRouter.get('/productos/listar/:id', (req, res) => {
    return res.json(productos.listarPorId(req.params.id));
  });
  
  productosRouter.post('/productos/guardar', (req, res) => {
    res.redirect('/')
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

const puerto = 8080;
app.use('/api', productosRouter);

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});