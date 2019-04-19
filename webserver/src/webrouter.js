const SrvHttp = require('./server/SrvHttp');
const router = SrvHttp.getRouter();

const webC = require('./controller/WebController');
router.get( '/home', webC.act_get_table );


