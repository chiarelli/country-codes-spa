const threads = require('threads');
const config  = threads.config;
const spawn   = threads.spawn;

config.set({
  basepath : {
    node : `${__dirname}/src`,
  }
});

function start() {
    var thread = spawn('server.js');
    
    thread.send({}).promise().then(() => {},
        (error) => {
            console.log(error);
            console.log('webserver vacancies reiniciando...');
            thread.kill();
            // Aguarda 500 ms para reiniciar
            setTimeout(start, 500);
        }
    );

    process.on('SIGHUP', () => { process.exit(); });
    process.on('exit', () => { thread.kill(); });
};

start();