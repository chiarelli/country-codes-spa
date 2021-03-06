const Promise = require('bluebird');
const ApiBO = require('../bo/ApiBO');
const { CountryCodes } = require('../model/CountryCodesModel');

const types = ['json', 'xlsx', 'csv'];

class DevController {
    
    static act_ola_mundo(req, resp) {
        return resp.status(200).send({msg: 'Olá mundo!'});
    }
    
    static act_create_model(req, resp) {
        CountryCodes.create({
            "code": "ZW",
            "country": "Zimbabwe"
        })
            .then(function (result) {        
                return resp.status(200).send(result);                    
            }).catch( _error400(resp) );
    }
    
    static act_model_country_codes(req, resp) {
        CountryCodes.find({}).exec()
            .then(function (result) {        
                return resp.status(200).send(result);                    
            }).catch( _error400(resp) );
    }
    
    static act_get_country_codes(req, resp) {        
        let sort  = req.query['order_by'] || 'country',
            order = req.query['order'] || 'ascending', 
            application = req.query['application_type'] ? req.query['application_type'].trim().toLowerCase() : 'json', 
            type  = types[ types.indexOf( application ) ]
        ;    
        
        ApiBO.getCountryCodes(type, sort, order)
            .then(function (result) {
                
                resp.set('Content-Type', `application/${type}; charset=utf-8`); 
                resp.set('Content-Disposition', `attachment; filename="country-codes.${type}"`);        
                resp.status(200);
                
                if( type === 'xlsx' ) return resp.end(result, 'binary');
                
                resp.send(result);
                
            }).catch( _error400(resp) );
    }
    
}

function _error400(resp) {
    return (err) => {
        console.log("Exception: ", err);
        return resp.status(400).send({codeHttpError: '400', msg: 'error during response processing.'});           
    }
}

module.exports = DevController;
