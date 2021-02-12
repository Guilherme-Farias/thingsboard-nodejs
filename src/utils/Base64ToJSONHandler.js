const base64 = require("base-64")


function cleanJSONString(string) {
    string = string.replace(/\\n/g, '\\n')
        .replace(/\\'/g, '\\\'')
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f');
    return string.replace(/[\u0000-\u0019]+/g, '');
}


const Base64ToJSONHandler = (string) => {
    return JSON.parse(cleanJSONString(base64.decode(string)))
}


module.exports = Base64ToJSONHandler