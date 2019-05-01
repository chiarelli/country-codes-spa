const express    = require('express');
const app        = express();
const router     = express.Router();
const logger     = require('morgan');
const helmet     = require('helmet');
const UserError  = require('../utilits/UserError');

var conn = null;

class SrvHttp {
    
};

SrvHttp._middlewarers = [];

SrvHttp.registerMiddleware = (middlewarer) => {
    SrvHttp._middlewarers.push( middlewarer );
};

SrvHttp.getRouter = () => {
    return router;
};

SrvHttp.getConn = (options) => {
    
    options = Object.assign(
        {
            root_api: '/'
        },
        (options ? options : {})
    );
    
    if( ! conn ) {     
        app.use(logger('dev'));
        app.use(helmet());
        
        
        var mdw;
        for (i = 0; i < SrvHttp._middlewarers.length; i++) {
            mdw = SrvHttp._middlewarers[i];
            app.use(mdw);         
        }
        
        app.use(express.static(__dirname + '/../../www/public'));
        app.use(function (req, resp, next) {
            resp.set('Access-Control-Allow-Origin', '*');
            next();
        });
        
        app.use(options.root_api, router);
        
        app.use(function (req, resp, next) {
            resp.status(404).send({
                error: 'not_found',
                content: `Cannot ${req.method} ${req.connection.parser.incoming.url}`
            });
        });
        
        
        app.use(function(err, req, res, next) {            
            let sender = {'error': err.message };

            if( err instanceof UserError ) {
                sender.content = err.getErrors();
                return res.status(400).send(sender); 
            }
            
            _error500Finally(err, req, res);
        });
            
        return app;
    }
    
    return conn;
};

function _error500Finally(err, req, res) {

        sender = {
            exception: err.name,
            error: 'internal_server_error',
            content: `Please contact support for further clarification`
        };
        console.log(err);
    
    return res.status(500).send(sender);  
};

module.exports = SrvHttp;