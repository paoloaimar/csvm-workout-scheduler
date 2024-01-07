require("dotenv").config();
import log from 'loglevel';
import { LogLevel, LogLevelDesc, } from 'loglevel';

class LogService {

    private static instance: LogService;
    Levels: LogLevel = log.levels;
    Level: string;

    constructor() {

        this.Level = process.env.LOG_LEVEL ?? 'warn';
        this._init();
    }

    /**
     * Initialization of the service
     */
    _init() {
        if (process.env.ENVIRONMENT === "PROD") {
            this.Level = this.Levels.WARN.toString();
        }

        log.setLevel(this.Level as LogLevelDesc, true);
        log.noConflict();
    }

    /**
     * Execute a log of a desired message
     * @param message Message to log
     * @param level Level of the log
     * @param logOnDb Log and store the message on the dedicated db table
     * @param color Color of the log in the terminal
     * @returns -1 Log Failed, 1 Output log OK
     */
    async log(message: any, level: LogLevelDesc = log.levels.INFO, logOnDb: boolean = false) {

        let result: number = -1;

        try {

            const logLevel = Object.keys(this.Levels)[Object.values(this.Levels).indexOf(level)] ?? 'WARN';


            switch (logLevel) {
                case 'TRACE': log.trace(message); break;
                case 'DEBUG': log.debug(message); break;
                case 'INFO': log.info(message); break;
                case 'WARN': log.warn(message); break;
                case 'ERROR': log.error(message); break;
            }

            result = 1;


        } catch (error) {
            console.error("Error on message logging", error);
            result = -1;
        }

        return result;
    }

    /**
     * Trace a message
     * @param message  Message to log
     * @returns -1 Log Failed, 1 Output log OK
     */
    trace(message: any) {
        let result: number = -1;

        try {
            log.trace(message);
            result = 1;
        } catch (error) {
            console.error("Error tracing message", error);
            result = -1;
        }

        return result;
    }

    /**
     * Log a debug message
     * @param message  Message to log
     * @returns -1 Log Failed, 1 Output log OK
     */
    debug(message: any) {
        let result: number = -1;

        try {
            log.debug(message);
            result = 1;
        } catch (error) {
            console.error("Error log debug message", error);
            result = -1;
        }

        return result;
    }

    /**
     * Log an information message
     * @param message  Message to log
     * @returns -1 Log Failed, 1 Output log OK
     */
    info(message: any) {
        let result: number = -1;

        try {
            log.info(message);
            result = 1;
        } catch (error) {
            console.error("Error log info message", error);
            result = -1;
        }

        return result;
    }

    /**
     * Log a warning message
     * @param message  Message to log
     * @returns -1 Log Failed, 1 Output log OK
     */
    warn(message: any) {
        let result: number = -1;

        try {
            log.warn(message);
            result = 1;
        } catch (error) {
            console.error("Error log warning message", error);
            result = -1;
        }

        return result;
    }

    /**
     * Log an error message
     * @param message  Message to log
     * @returns -1 Log Failed, 1 Output log OK
     */
    error(message: any) {
        let result: number = -1;

        try {
            log.error(message);
            result = 1;
        } catch (error) {
            console.error("Error log error message", error);
            result = -1;
        }

        return result;
    }

    /**
     * Set a new logging level
     * @param newLevel New log level to set as current for the service
     */
    setNewLevel(newLevel: LogLevelDesc) {
        try {

            this.Level = Object.keys(this.Levels)[Object.values(this.Levels).indexOf(newLevel)] ?? 'warn';
            log?.setLevel(this.Level as LogLevelDesc);

        } catch (error) {
            console.error("Error setting new log level", error);
        }
    }

    /**
     * Disable the Log Service
     */
    disable() {
        try {
            log?.setLevel(this.Levels.SILENT);
        } catch (error) {
            console.error("Error on disable logging", error);
        }
    }


    public static getInstance(): LogService {
        if (!LogService.instance) {
            LogService.instance = new LogService();
        }

        return LogService.instance;
    }

    //#endregion


}

export const logger = LogService.getInstance();