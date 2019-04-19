const Promise = require('bluebird');
const path = require('path');

function web_root(relative) {
    return path.join( __dirname + '/../../www/' + relative );
}

class WebController {
    
    static act_home(req, resp) {
        return resp.status(200).render(web_root('/index.html'));        
    }
    
    static act_get_table(req, resp) {
        return resp.status(200).render(web_root('/table.html'));
    }
}

module.exports = WebController;
