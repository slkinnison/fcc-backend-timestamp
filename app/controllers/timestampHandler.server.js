'use strict';

var url = require('url');

var getMonthString = function (monthInt) {
    var retVal;
    switch (monthInt) {
        case 0:
            retVal = 'January';
            break;
        case 1:
            retVal = 'February';
            break;
        case 2:
            retVal = 'March';
            break;
        case 3:
            retVal = 'April';
            break;
        case 4:
            retVal = 'May';
            break;
        case 5:
            retVal = 'June';
            break;
        case 6:
            retVal = 'July';
            break;
        case 7:
            retVal = 'August';
            break;
        case 8:
            retVal = 'September';
            break;
        case 9:
            retVal = 'October';
            break;
        case 10:
            retVal = 'November';
            break;
        case 11:
            retVal = 'December';
            break;
        default:
            retVal = 'Not a valid month';
    }
    return retVal;    
};

function TimestampHandler () {
    this.convertTimestamp = function (req, res) {
        var returnObj = { 'unix': null, 'natural': null };
        var path = url.parse(req.url).pathname;
        var input = path.substr( path.lastIndexOf('/') + 1 );

        if ( input === null ) {
            return returnObj;
        }
    
        var milliseconds = Number.NaN;
        if ( !isNaN(input)) {
            // This should be unix time (which is seconds)...convert to milliseconds
            milliseconds = Number(input) * 1000;
        } else {
            milliseconds = Date.parse(decodeURIComponent(input));
        }

        if (!isNaN(milliseconds)) {
            var aDate = new Date(milliseconds);
            returnObj.unix = milliseconds / 1000;
            returnObj.natural = getMonthString(aDate.getMonth()) + ' ' + aDate.getDate() + ', ' + aDate.getFullYear();
        }
        res.json(returnObj);
    };
}

module.exports = TimestampHandler;
