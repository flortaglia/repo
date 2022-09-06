const { Router } =require( 'express');
const router= Router();
const path = require( 'path') 
const {faker}  =require( "@faker-js/faker");
faker.locale='es'
// const express= require ("express")
// const compression = require ("compression")
// const app = express()


const cpus = require ('os').cpus()
const logger = require('../utils/logger.js')
//middleware a nivel enrutador, se ejecutará en cada req del route
router.use(function (req, res, next){
    const { url, method } = req;
    logger.info(`Método ${method} URL ${url} recibida`);
    next()
})

module.export = router.get ('/api/productos-test', (req,res)=>{
    
    const response = [];

    for (let i = 0; i < 5; i++) {
      response.push({
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
      });
    }
    // console.log(response)
    res.json(response);
})

//INICIO PASSPORT

module.exports = function(passport){
  //cl28
  function authMiddleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
  //INDEX
  router.get('/',authMiddleware,(req,res)=>{
    
    res.sendFile(path.join(__dirname, ".././public/index.html"));
  }) 
  ////////          LOGIN         ////////
  //GET LOGIN

  router.get('/login',(req, res)=>{
    if(req.isAuthenticated()){
      // console.log('estoy logueadooooo')
      let user= req.user
      res.redirect('/')
    }else{
      // console.log('usuario no logueado')
      res.sendFile(path.join(__dirname, ".././public/login.html")); //aca si podría un res.render
    }
    
  })

  router.get('/user-info',(req, res)=>{
    res.json({username: req.user.username})
  })

  //POST LOGIN
  router.post('/login',passport.authenticate('login',
    {failureRedirect: '/fail-login',failureMessage: true}),
    (req, res)=>{
      // console.log('req- metodo post-login',req.body)
      let user= req.username
      res.redirect('/')
    }
  )
  //GET FAIL LOGIN
  router.get('/fail-login',(req, res)=>{
    // console.log('req.session.messages',req.session.messages)
    res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
  })

  ///////           SIGNUP            ///////////////////
  //GET REGISTRATION
  router.get('/signup',(req, res)=>{
    res.sendFile(path.join(__dirname, ".././public/signup.html")); 
  })
  //POST REGISTRATION
  router.post('/signup',passport.authenticate('signup',
    { failureRedirect: '/fail-signup',failureMessage: true}),
    (req, res)=>{
      // console.log('req- metodo post-login',req.body)
      let user= req.user
      res.redirect('/')
    }
  )
  ///FAIL SIGNUP
  router.get('/fail-signup',(req, res)=>{
    res.sendFile(path.join(__dirname, ".././public/failsignup.html"));
  })

  //LOGOUT
  router.get('/logout',  function(req, res, next) {
    let user= req.user.username
    // console.log('req.user',req.user)
    req.logout(function(err) {   //METODO DE PASSPORT
      if (err)  return next(err); 
      res.send(`<h1>Hasta luego ${user}</h1>
        <script type="text/javascript">
        setTimeout(function(){ location.href = '/login'},2000)
        </script>`
      )
    })
  })

  //RUTA /info VISTA DATOS SENCILLA   CL28
  router.get('/info', function(req, res) {
    let puerto = process.argv[3] || 8080
    const data = `<h1>Información</h1>
    <ul>
    <li>Argumentos de entrada: ${puerto} </li>
    <li>Nombre de la plataforma (sistema operativo): ${process.platform} </li>
    <li>Versión de node.js: ${process.version} </li>
    <li>Memoria total reservada (rss): ${process.memoryUsage.rss()} bytes </li>
    <li>Path de ejecución: ${process.execPath} </li>
    <li>Process id: ${process.pid}</li>
    <li>Carpeta del proyecto: ${process.cwd()} </li>
    <li>Número de procesadores en el servidor (workers): ${cpus.length} </li>
    </ul>` ;

    res.send(data)
   
  })
  router.get('/info-bloq', function(req, res) {
    let puerto = process.argv[3] || 8080
    const data = `<h1>Información</h1>
    <ul>
    <li>Argumentos de entrada: ${puerto} </li>
    <li>Nombre de la plataforma (sistema operativo): ${process.platform} </li>
    <li>Versión de node.js: ${process.version} </li>
    <li>Memoria total reservada (rss): ${process.memoryUsage.rss()} bytes </li>
    <li>Path de ejecución: ${process.execPath} </li>
    <li>Process id: ${process.pid}</li>
    <li>Carpeta del proyecto: ${process.cwd()} </li>
    <li>Número de procesadores en el servidor (workers): ${cpus.length} </li>
    </ul>` ;
    console.log(data)
    res.send(data)
   
  })


  // route.get('/info-gzip',compression(), function(req, res) {
  //   let puerto = process.argv[3] || 8080
  //   const data = ('I love GeeksforGeeks').repeat(800) ;
  //   res.send(`<h1>Información</h1>
  //     <ul>
  //     ${data}
  //     <li>Argumentos de entrada: ${puerto} </li>
  //     <li>Nombre de la plataforma (sistema operativo): ${process.platform} </li>
  //     <li>Versión de node.js: ${process.version} </li>
  //     <li>Memoria total reservada (rss): ${process.memoryUsage.rss()} bytes </li>
  //     <li>Path de ejecución: ${process.execPath} </li>
  //     <li>Process id: ${process.pid}</li>
  //     <li>Carpeta del proyecto: ${process.cwd()} </li>
  //     <li>Número de procesadores en el servidor (workers): ${cpus.length} </li>
  //     </ul>`
  //   )
   
  // })

  return router;

}

// export default router;