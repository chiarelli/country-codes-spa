module.exports = function(input, done) {
    try {        
        require('dotenv-safe').load();
        require('./webrouter');
        
        const srvHttp = require('./server/SrvHttp');
        
        srvHttp.getConn()
            .engine('pug', require('pug').__express)
            .engine('html', require('ejs').renderFile)
            .listen(8080);

        console.log("webserver ok!");

    } catch (e) {
        console.log(e);
        done(e.message);
    }
}

