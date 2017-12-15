var path = require('path');

module.exports  = function (req, res) {
    var errors = {},
        body = req.body,
        numbers = body.num,
        letters = body.let,
        agreement = body.agr,
        types = body.typ;

    if (!valid(numbers, '0123456789')) {
        errors.num = "Invalid numbers";
    }

    if (!valid(letters, 'abcd')) {
        errors.let = "Invalid letters";
    }

    if (agreement !== true) {
        errors.agr = "Agreement is unchecked";
    }

    if (!types) {
        errors.typ = "Type is unchecked";
    }

    var countErrors = Object.keys(errors);

    if(countErrors.length > 0) {
        res.status(500).json(errors);
    } else {
        res.json({message: 'Success'});
    }


    function valid(string, symbols) {
        if (string.length === 0) {
            return false;
        }

        for (var i = 0; i < string.length; i++) {
            if (symbols.indexOf(string.charAt(i)) === -1) {
                return false;
            }
        }

        return true;
    }
};