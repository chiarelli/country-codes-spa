const Promise = require('bluebird');
const { CountryCodes } = require('../model/CountryCodesModel');

class CountryCodesStore {
    
    static getAll(limit, offset, sort) {
        return _find(CountryCodes, {}, [], limit, offset, sort);
    }
    
    static saveOrUpdate(data) {
        return new Promise(function (ok, fail) {
            CountryCodes.findOneAndUpdate({ code: data.code }, data, {new: true, upsert: true})
                    .then(ok, fail);
        });
    }
    
}

function _find(model, query, populate=[], limit=20, offset=0, sort={}) {
    limit = parseInt(limit);
    offset = parseInt(offset);
    let schema = model.find( query );          
    let _query = schema.toConstructor();

    return _query().limit(limit).skip(offset).populate(populate).sort(sort).exec();
};

module.exports = CountryCodesStore;
