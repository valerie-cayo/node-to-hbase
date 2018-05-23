const winston = require('winston');

const log = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            prettyPrint: true,
            showLevel: true,
            timestamp: true
        }),
        new (winston.transports.File)({
            colorize: true,
            filename: 'logs/system.log', // This is placed at the root of the file
            logstash: true,
            prettyPrint: true,
            timestamp: true
        })
    ]
});

module.exports = log;
