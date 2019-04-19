const SrvHttp = require('./server/SrvHttp');
const router = SrvHttp.getRouter();

const webC = require('./controller/WebController');

router.get( '/', webC.act_home );
router.get( '/table', webC.act_get_table );

const devC = require('./controller/DevController');
router.get( '/api/dev/message', devC.act_ola_mundo );
router.get( '/api/dev/create-country-codes', devC.act_create_model );
router.get( '/api/dev/model-country-codes', devC.act_model_country_codes );

router.get( '/api/country-codes', devC.act_get_country_codes );


