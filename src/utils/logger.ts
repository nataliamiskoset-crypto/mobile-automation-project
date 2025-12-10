import pino from "pino";

export const logger = pino({
    level: "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
        }
    }
});

export function step(message: string) {
    logger.info(`🟦 STEP: ${message}`);
}

export function action(message: string) {
    logger.debug(`➡️ ACTION: ${message}`);
}

export function errorLog(message: string) {
    logger.error(`❌ ERROR: ${message}`);
}
