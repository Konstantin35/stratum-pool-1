var Stratum = require('./lib/index.js');

var fs = require('fs');
var os = require('os');

var PoolLogger = require('./logUtil.js');

var logger = new PoolLogger({
    logLevel: "debug",
    logColors: true
});

var logSystem = 'Pool';
var logComponent = "VDS";
var logSubCat = 'Thread 1';

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

// pool.on('share', function(isValidShare, isValidBlock, data){
//
//     if (isValidBlock)
//         console.log('Block found');
//     else if (isValidShare)
//         console.log('Valid share submitted');
//     else if (data.blockHash)
//         console.log('We thought a block was found but it was rejected by the daemon');
//     else
//         console.log('Invalid share submitted')
//
//     console.log('share data: ' + JSON.stringify(data));
// });


pool.on('share', function(isValidShare, isValidBlock, data){

    var shareData = JSON.stringify(data);

    if (data.blockHash && !isValidBlock)
        logger.debug(logSystem, logComponent, logSubCat, 'We thought a block was found but it was rejected by the daemon, share data: ' + shareData);

    else if (isValidBlock)
        logger.debug(logSystem, logComponent, logSubCat, 'Block found: ' + data.blockHash + ' by ' + data.worker);

    if (isValidShare) {
        if(data.shareDiff > 1000000000) {
            logger.debug(logSystem, logComponent, logSubCat, 'Share was found with diff higher than 1.000.000.000!');
        } else if(data.shareDiff > 1000000) {
            logger.debug(logSystem, logComponent, logSubCat, 'Share was found with diff higher than 1.000.000!');
        }
        logger.debug(logSystem, logComponent, logSubCat, 'Share accepted at diff ' + data.difficulty + '/' + data.shareDiff + ' by ' + data.worker + ' [' + data.ip + ']' );
    } else if (!isValidShare) {
        logger.debug(logSystem, logComponent, logSubCat, 'Share rejected: ' + shareData);
    }

}).on('difficultyUpdate', function(workerName, diff){
    logger.debug(logSystem, logComponent, logSubCat, 'Difficulty update to diff ' + diff + ' workerName=' + JSON.stringify(workerName));
}).on('log', function(severity, text) {
    logger[severity](logSystem, logComponent, logSubCat, text);
});




(function init(){

    pool.start();

})();
