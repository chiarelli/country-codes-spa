const Promise = require('bluebird');
const Citartech = require('../service/CitartechService');
const CountryCodesStore = require('../store/CountryCodesStore');

class ApiBO {
    
    static getCountryCodes(type, sort = 'country', order = 'ascending') {
        return new Promise(function (ok, fail) {
            
            Citartech.getRawCountryCodes()
                .then(function (resp) {
                    let 
                        lines     = resp.split(/\n/),
                        newLines  = lines.slice(3, (lines.length - 2)  ),              
                        list      = []
                    ;

                    for (let i = 0; i < newLines.length; i++) {
                        let [ code, country ] = newLines[i].split(/\s\W*/);
                        let data = { code, country };
                        CountryCodesStore.saveOrUpdate(data);
                        list.push(data);
                    }
                    console.log('** get CountryCodes for Citartech service **');
                    ok(list);
                })
                .catch(function (err) {                    
                    console.log('** get CountryCodes for CACHE mongodb **');
                    CountryCodesStore.getAll().then(ok, fail);
                });
                
        })
        .then(function (list) {
            return new Sortable(list).sortPicker(sort.toLowerCase().trim(), order.toLowerCase().trim() !== 'descending');       
        });
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