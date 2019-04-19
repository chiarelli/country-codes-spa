const SrvHttp = require('./server/SrvHttp');
const router = SrvHttp.getRouter();

const devC = require('./controller/DevController');
router.get( '/dev/message', devC.act_ola_mundo );
router.get( '/dev/model-country-codes', devC.act_model_country_codes );

router.get( '/dev/country-codes', devC.act_get_country_codes );
router.get( '/dev/create-country-codes', devC.act_create_model )
;
router.get( '/dev/www', devC.act_get_www );