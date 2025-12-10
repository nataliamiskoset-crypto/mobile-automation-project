import { config as baseConfig } from './wdio.conf';
import * as yargs from "yargs";

// Parse command line arguments
const argv = yargs
    .option('platform', {
        alias: 'p',
        description: 'Specify the platform (android or ios)',
        type: 'string',
        choices: ['android', 'ios'],
        demandOption: true,
    })
    .help()
    .argv;

// Base WebdriverIO configuration
const config = {
    ...baseConfig,

    // You can add your platform-specific capabilities here
    capabilities: [
        {
            platformName: argv.platform === 'ios' ? 'iOS' : 'Android',
            // Other capabilities can be defined here
            // Example:
            // appiumVersion: '1.20.2',
            // deviceName: argv.platform === 'ios' ? 'iPhone Simulator' : 'Android Emulator',
            // platformVersion: argv.platform === 'ios' ? '14.5' : '11.0',
        },
    ],

    // Optional: You can set a different base URL based on platform
    baseUrl: argv.platform === 'ios' ? 'http://ios.example.com' : 'http://android.example.com',

    // Other WebdriverIO configurations...
};

export { config };
