const Promise = require('bluebird');
const ApiBO = require('../bo/ApiBO');
const { CountryCodes } = require('../model/CountryCodesModel');

const types = ['json', 'xls', 'csv'];

class DevController {
    
    static act_ola_mundo(req, resp) {
        return resp.status(200).send({msg: 'Olá mundo!'});
    }
    
    static act_get_country_codes(req, resp) {        
        let sort  = req.query['sort_prop'] || 'country',
            order = req.query['sort_order'] || 'ascending', 
            application = req.query['application_type'] ? req.query['application_type'].trim().toLowerCase() : 'json', 
            type  = types[ types.indexOf( application ) ]
        ;    
//        console.log(type);
        ApiBO.getCountryCodes(type, sort, order)
            .then(function (result) {
                
                resp.set('Content-Type', `application/${type}; charset=utf-8`); 
                resp.set('Content-Disposition', `attachment; filename="country-codes.${type}"`);
        
                return resp.status(200).send(result);                    
            }).catch(function (err) {
                return resp.status(400).send({codeHttpError: '400', msg: 'error during response processing.'});   
            });
    }
    
    static act_model_country_codes(req, resp) {
        CountryCodes.find({}).exec()
            .then(function (result) {        
                return resp.status(200).send(result);                    
            }).catch(function (err) {
                return resp.status(400).send({codeHttpError: '400', msg: 'error during response processing.'});   
            });
    }
    
}

module.exports = DevController;
