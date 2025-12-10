import { logger } from "./src/utils/logger";
import type { WebdriverIO } from "@wdio/types";


import path from "path";
import * as fs from "node:fs";
const PLATFORM = process.env.PLATFORM?.toLowerCase() || "android";
const configFilePath = PLATFORM === "android"
    ? path.resolve(__dirname, "./src/config/config.android.json")
    : path.resolve(__dirname, "./src/config/config.ios.json");
const rawData = fs.readFileSync(configFilePath, "utf-8");
const platformConfig = JSON.parse(rawData);
const selectedCapability: WebdriverIO.Capabilities = platformConfig;

if (PLATFORM === "ios") {
    console.error("❌ iOS platform is not supported yet!");
    process.exit(1);
}

console.log(`✅ Running tests on platform: ${PLATFORM}`);
export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './test/tsconfig.json',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,
    capabilities: [selectedCapability],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: true }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: async function () {
        logger.info("🔧 Test run started");
    },

    beforeSuite: function (suite) {
        logger.info(`📁 Suite: ${suite.title}`);
    },

    beforeTest: function (test) {
        logger.info(`🧪 Test start: ${test.title}`);
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const screenshot = await browser.takeScreenshot();
            // jeśli używasz Allure
            // allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');

            logger.error(`🔴 Test FAILED: ${test.title} | Error: ${error?.message || JSON.stringify(result)}`);
        } else {
            logger.info(`🟢 Test passed: ${test.title}`);
        }
    }
};
