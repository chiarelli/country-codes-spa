const Promise = require('bluebird');
const path = require('path');

class WebController {
    
    static act_get_table(req, resp) {
        return resp.status(200).render(path.join(__dirname+'/../../www/table.html'));
    }
}

module.exports = WebController;
