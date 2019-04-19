const SrvHttp = require('./server/SrvHttp');
const router = SrvHttp.getRouter();

const webC = require('./controller/WebController');
router.get( '/', webC.act_home );
router.get( '/table', webC.act_get_table );


