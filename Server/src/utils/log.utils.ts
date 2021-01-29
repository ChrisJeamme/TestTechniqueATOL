import pino from 'pino'

export const logger = pino({
    prettyPrint: {
        levelFirst: false,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        ignore: 'pid,hostname'
    },
    level: 'trace', // Print TRACE & DEBUG & INFO & WARN & ERROR & FATAL
    prettifier: require('pino-pretty')
})
