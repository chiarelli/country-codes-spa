const mongoose = require('../conn/MongodbConn');

const Schema = mongoose.Schema;

const CountryCodesSchema = new Schema({
    code: { type: String, required: true, unique: true, trim: true, maxlength: 2 },
    country: { type: String, maxlength: 100 }
});

exports.CountryCodesSchema = CountryCodesSchema;
exports.CountryCodes = mongoose.model('CountryCodes', CountryCodesSchema);
