process.on('message', (message) => {

    let showResult = num_aleatorio(message);
    process.send(showResult);
    
});


function num_aleatorio(num){
    
    const max=1000
    const min = 1
    let objeto={}
    for(let i = 0; i < num; i++) {
        const numeroAleatorio= Math.floor(Math.random() * (max - min + 1) + min)
        if(objeto[numeroAleatorio]) {
            objeto[numeroAleatorio] = objeto[numeroAleatorio] + 1
        } else {
            objeto[numeroAleatorio] = 1
        }

    }
    return objeto
}