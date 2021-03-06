const Promise = require('bluebird');
const Citartech = require('../service/CitartechService')();
const CountryCodesStore = require('../store/CountryCodesStore');

const timeOut = 15 * 60 * 1000;
var refreshCacheAt = new Date();

const BR_BRASIL = '(BR) BRASIL';

class ApiBO {
    
    static getCountryCodes(type, sort = 'country', order = 'ascending') {
        return Promise.coroutine(function* () {            
            var list = [];
            var now = new Date();
            
            var updateAt = new Date();
                updateAt.setTime( now.getTime() + timeOut );
            
            try {
                let 
                    resp      = yield Citartech.getRawCountryCodes(),
                    lines     = resp.split(/\n/),
                    newLines  = lines.slice(3, (lines.length - 2)  )          
                ;
                
                for (let i = 0; i < newLines.length; i++) {
                    let [ code, country ] = newLines[i].split(/\s\W*/);
                    let data = { code, country };
                    
                    if( refreshCacheAt.getTime() < now.getTime() ) {
                        yield CountryCodesStore.saveOrUpdate(data);
                        refreshCacheAt = updateAt;
                    }
                    
                    
                    list.push(data);
                }
                
                console.log('** get CountryCodes for Citartech service **');
                
            } catch (e) {
                console.error(e);
                console.log('Error get CountryCodes for Citartech service, try to recover through the cache ....');
                console.log('** get CountryCodes for CACHE mongodb **');

                ( yield CountryCodesStore.getAll(0) )
                    .forEach(function (model) {
                        list.push( model.toJSON() );
                    })
                
                if( ! list.length ) {
                    throw new Error( 'The cache was empty.' );
                }
                
            }
            
            var sortabled = new Sortable(list).sortPicker(sort.toLowerCase().trim(), order.toLowerCase().trim() !== 'descending');
            
            for (let i = 0; i < sortabled.length; i++) {
                sortabled[i]['col3'] = BR_BRASIL;
            }
            
            return _convertToTotem(type, sortabled);            
        })();        
    }
    
}

function _convertToTotem (type, input) {
    
    switch (type) {
        case 'xlsx':
            const json2xls = require('json2xls');
            return json2xls(input);
        
        case 'csv':
            const { Parser } = require('json2csv'); 
            const fields = ['code', 'country', 'col3'];
            
            const json2csvParser = new Parser({ fields });
            return json2csvParser.parse(input);
            
        case 'json':
        default:
            return input;
    }
    
}

class Sortable {
    
    constructor(list) {
        this.list = list;
    }
    
    sortPicker(sort = 'country', ascending = true) {                
        let result;
        
        switch (sort) {
            case 'code':
                result = this._byCode( ascending );
                break;
                
            default:
            case 'country':
                result = this._byCountry( ascending );
                break;
        }
        return result;
    }
    
    _byCountry(ascending = true) {
        return this._sort('country', ascending);
    }
    
    _byCode(ascending = true) {
        return this._sort('code', ascending);
    }
    
    _sort(prop, ascending = true) {        
        return this.list.sort(function(a, b){
            var nameA=a[prop].toLowerCase(), nameB=b[prop].toLowerCase()
            if (nameA < nameB) //sort string ascending
                return ascending ? -1 : 1 
            if (nameA > nameB)
                return ascending ? 1 : -1
            return 0 //default return value (no sorting)
        })        
    }
}

module.exports = ApiBO;