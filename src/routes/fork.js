//cl28
const { Router } =require( 'express');
const router= Router();
const path = require( 'path') 
const {fork}= require ('child_process')

module.exports= router.get('/api/randoms',(req, res) => {
    const num = Number(req.query.num)  || 1e8
    
    // const child = fork(path.join(__dirname, ".././api/num_aleatorio.js"))
    // child.send(num)
    // child.on('message', message => res.json(message))
    
    
})


