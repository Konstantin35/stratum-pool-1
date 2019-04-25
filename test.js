var fs = require('fs');
var os = require('os');
var blockTemplate = require('./lib/algoProperties.js');
var blockTemplate = require('./lib/blockTemplate.js');

JSON.minify = JSON.minify || require("node-json-minify");

var options = JSON.parse(JSON.minify(fs.readFileSync("config.json", {encoding: 'utf8'})));
var rpcData = JSON.parse(JSON.minify(fs.readFileSync("rpcData.json", {encoding: 'utf8'})));

var subsidy = {
    "miner": 500, "founders": 0
}

var util = require('./lib/util.js');
console.log(util.packUInt32LE(1556219429).toString('hex'))
console.log(util.packUInt32LE(1556219483).toString('hex'))
console.log(util.packUInt32LE(1556219516).toString('hex'))
console.log(util.packUInt32LE(1556219523).toString('hex'))
console.log(util.packUInt32LE(1556219539).toString('hex'))
console.log(util.packUInt32LE(1556219652).toString('hex'))
console.log(util.packUInt32LE(1556219701).toString('hex'))
console.log(util.packUInt32LE(1556219719).toString('hex'))
console.log(util.packUInt32LE(1556219750).toString('hex'))
console.log(util.packUInt32LE(1556219754).toString('hex'))
// console.log(util.reverseBuffer(new Buffer('9df68b131d541456a68b5e44286c06add3c84a6d455bbfb7982bf716fdf881dd', 'hex')).toString('hex'))
//
//
// rpcData.miner = subsidy.miner;
// if (!rpcData.founders) {
//     rpcData.founders = (subsidy.founders || subsidy.community || (subsidy['founders-chris'] + subsidy['founders-jimmy'] + subsidy['founders-scott'] + subsidy['founders-shelby'] + subsidy['founders-loki']));
// } else {
//     // founders already set in block template
//     // console.log(result.response.founders);
// }
//
// // I hate to do this but vision coin doesn't send the
// // correct response for getblocksubsidy so this allows
// // us to override.
// if (options.coin.rewardMinersPercent) {
//     rpcData.miner = options.coin.blockReward * options.coin.rewardMinersPercent
// }
//
// if (options.coin.rewardFoundersPercent) {
//     rpcData.founders = options.coin.blockReward * options.coin.rewardFoundersPercent
// }
//
// rpcData.securenodes = (subsidy.securenodes || 0);
// rpcData.supernodes = (subsidy.supernodes || 0);
//
// // SafeCash / Genx
// if (!rpcData.masternode_payments_started) {
//     // Before masternodes
//     rpcData.infrastructure = (subsidy.infrastructure || 0);
//     rpcData.giveaways = (subsidy.giveaways || 0);
//     rpcData.chris = (subsidy['founders-chris'] || 0);
//     rpcData.jimmy = (subsidy['founders-jimmy'] || 0);
//     rpcData.scott = (subsidy['founders-scott'] || 0);
//     rpcData.shelby = (subsidy['founders-shelby'] || 0);
//     rpcData.loki = (subsidy['founders-loki'] || 0);
// } else {
//     // Masternodes active
//     rpcData.infrastructure = (subsidy.infrastructure || 0);
//     rpcData.giveaways = (subsidy.giveaways || 0);
//     rpcData.masternodestotal = (subsidy.masternodestotal || 0);
//     rpcData.governancetotal = (subsidy.governancetotal || 0);
//     rpcData.founderstotal = (subsidy.founderstotal || 0);
//     rpcData.founderamount = (subsidy.founderamount || 0);
// }
//
// var recipients = [];
// processTemplate = function (rpcData) {
//
//     var tmpBlockTemplate = new blockTemplate(
//         "ccdf",
//         rpcData,
//         undefined,
//         recipients,
//         options.address,
//         options.poolHex,
//         options.coin
//     );
//     return tmpBlockTemplate
// };
//
//
// var message = processTemplate(rpcData);
// console.log( message)message