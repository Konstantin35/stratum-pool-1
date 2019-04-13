var Stratum = require('./lib/index.js');

var fs = require('fs');
var os = require('os');

JSON.minify = JSON.minify || require("node-json-minify");

if (!fs.existsSync('config.json')){
    console.log('config.json file does not exist. Read the installation/setup instructions.');
    return;
}

var config = JSON.parse(JSON.minify(fs.readFileSync("config.json", {encoding: 'utf8'})));


var pool = Stratum.createPool(config, function(ip, port , workerName, password, callback){ //stratum authorization function
    console.log("Authorize " + workerName + ":" + password + "@" + ip);
    callback({
        error: null,
        authorized: true,
        disconnect: false
    });
});

pool.on('share', function(isValidShare, isValidBlock, data){

    if (isValidBlock)
        console.log('Block found');
    else if (isValidShare)
        console.log('Valid share submitted');
    else if (data.blockHash)
        console.log('We thought a block was found but it was rejected by the daemon');
    else
        console.log('Invalid share submitted')

    console.log('share data: ' + JSON.stringify(data));
});




(function init(){

    pool.start();

})();
