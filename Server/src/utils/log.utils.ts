import pino from 'pino'

export const logger = pino({
    prettyPrint: {
        levelFirst: false,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        ignore: 'pid,hostname'
    },
    // level: 60, // Print FATAL
    // level: 50, // Print ERROR & FATAL
    // level: 40, // Print WARN & ERROR & FATAL
    // level: 30, // Print INFO & WARN & ERROR & FATAL
    // level: 20, // Print DEBUG & INFO & WARN & ERROR & FATAL
    level: 'trace', // Print TRACE & DEBUG & INFO & WARN & ERROR & FATAL
    prettifier: require('pino-pretty')
})
