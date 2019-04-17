const SrvHttp = require('./server/SrvHttp');
const router = SrvHttp.getRouter();

const devC = require('./controller/DevController');
router.get( '/dev/message', devC.act_ola_mundo );
router.get( '/dev/country-codes', devC.act_get_country_codes );