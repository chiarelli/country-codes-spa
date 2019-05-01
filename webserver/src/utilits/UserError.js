class UserError extends Error {
    
    constructor(code, msg, previous) {
        super(previous || code );
        this.errors = {};
        if(previous instanceof UserError) this.merge(previous);
    
        this.addError(code, msg);
    }
    
    addError( code, msg ) {
        
        var value;
        
        if( this.errors.hasOwnProperty(code) ) {
            value = this.errors[code];
        }
        
        if( typeof value === 'undefined' ) {            
            this.errors[code] = [msg];
        } else if( Array.isArray(value) ) {
            value.push(msg);
            this.errors[code] = value;
        }
        
    };
    
    merge( previous ) {
        var _this = this;
        
        var object = previous.getErrors();
        
        for( var key in object ) {
            
            object[key].forEach(function (msg) {
                _this.addError(code, msg);
            });
            
        }
    };
    
    getErrors() {
        return Object.assign({}, this.errors);
    };
    
    
}

module.exports = UserError;
