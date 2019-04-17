const Promise = require('bluebird');
const Citartech = require('../service/CitartechService');

class ApiBO {
    
    static getCountryCodes(type, sort = 'country', order = 'ascending') {
        return Citartech.getRawCountryCodes()
            .then(function (resp) {
                let 
                    lines     = resp.split(/\n/),
                    newLines  = lines.slice(3, (lines.length - 2)  ),              
                    list      = [],
                    ascending = order.toLowerCase().trim() !== 'descending'
                ;
                
                for (let i = 0; i < newLines.length; i++) {
                    let [ code, country ] = newLines[i].split(/\s\W*/);
                    list.push({ code, country });
                }
                
                return new Sortable(list).sortPicker(sort.toLowerCase().trim(), ascending);                
            });
        ;
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