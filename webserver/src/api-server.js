module.exports = function(input, done) {
    try {        
        require('dotenv-safe').load();
        require('./api-router');
        
        const srvHttp = require('./server/SrvHttp');

        srvHttp.getConn({
                root_api: '/job-vacancies/v1/'
            })
            .listen(4050);

        console.log("api job-vacancies funcionando!");

    } catch (e) {
        console.log(e);
        done(e.message);
    }
}
