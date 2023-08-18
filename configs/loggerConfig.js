const winston = require('winston')
const dailyRotateFile = require('winston-daily-rotate-file')

const {timestamp,json,prettyPrint,colorize,label, combine} = winston.format

const logConfig = {
    defaultMeta: {
        api: 'Node Game Server',
    },
    level: 'verbose',
    transports: [new dailyRotateFile({
        datePattern: "DD.MM.YYYY",
        filename: 'log-%DATE%.log',
        dirname: './logs'
    })],
    format: combine(
        label({label: 'Uygulama V1'}),
        timestamp(),
        colorize(),
        prettyPrint(),
        json(),
    )
}

module.exports = logConfig