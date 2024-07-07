import winston from "winston";
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const winstonConfig = {
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: "info",
            handleExceptions: true,
        }),
        new winston.transports.File({
            level: "debug",
            filename: path.join(__dirname, `/logs/${new Date().toISOString().substring(0, 10)}-w.log`),
            handleExceptions: true,
            maxsize: 3145728, // ~3MB
            maxFiles: 30,
        })
    ],
    exitOnError: false,
}

const consoleColors = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
};

// Backing up main console functions because we are gone override them with winston logger
const consoleLog = console.log;
const consoleInfo = console.info; 
const consoleWarn = console.warn;
const consoleError = console.error;

function initWinston(){
    const winstonLogger = winston.createLogger(winstonConfig);

    // Overriding console functions with winston logger
    console.log = (...messages) => {
        consoleLog(...messages);
        winstonLogger.debug(JSON.stringify(messages));
    };

    console.info = (...messages) => {
        consoleInfo(consoleColors.green, ...messages, consoleColors.reset);
        winstonLogger.info(JSON.stringify(messages));
    };

    console.warn = (...messages) => {
        consoleWarn(consoleColors.yellow, ...messages, consoleColors.reset);
        winstonLogger.warn(JSON.stringify(messages));
    };

    console.error = (...messages) => {
        consoleError(consoleColors.red, ...messages, consoleColors.reset);
        winstonLogger.error(JSON.stringify(messages));
    };
}

function initMorgan(){
    return morgan('combined', { 
        stream: fs.createWriteStream(path.join(__dirname, `/logs/${new Date().toISOString().substring(0, 10)}-m.log`), { 
            flags: 'a' 
        })
    })
}

export { initWinston, initMorgan };
