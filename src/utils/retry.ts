import { logger } from "./logger";

export async function retry<T>(
    action: () => Promise<T>,
    validate: (result: T) => boolean | Promise<boolean>,
    attempts: number = 3,
    delay: number = 500
): Promise<T> {
    let lastResult: T | undefined;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        logger.info(`🔁 Attempt ${attempt}/${attempts}`);
        try {
            lastResult = await action();
            const isValid = await validate(lastResult);
            if (isValid) {
                logger.info("✅ Retry succeeded");
                return lastResult;
            }
            logger.warn("⚠️ Validation failed, retrying...");
        } catch (error) {
            logger.error(`❌ Error in attempt ${attempt}: ${error}`);
        }
        if (attempt < attempts) {
            await browser.pause(delay);
        }
    }
    throw new Error("Retry failed: all attempts exhausted.");
}
