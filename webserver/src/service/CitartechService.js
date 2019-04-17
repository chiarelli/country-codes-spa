const Promise = require('bluebird');
const request = require("request");

const Citartech = {
    
    getRawCountryCodes: function () {
        return new Promise(function (ok, fail) {
                request({
                    method: 'GET',
                    url: 'https://raw.githubusercontent.com/citartech/job-vacancies/master/assets/country-codes.txt',
                }, 
                function (error, res, body) {                        
                    if (error) fail(new Error(error));

                    if(res.statusCode != '200') 
                        fail(new Error({
                            code: res.statusCode, body: body
                        }));

                    ok(body);
                });
        });
    }
    
}

module.exports = Citartech;