# Mobile Automation Project

Automated testing framework for mobile applications using **WebdriverIO**, **Appium**, and **TypeScript**.

---

## ⚙️ Technologies & Frameworks

- **WebdriverIO** – test runner and automation framework
- **Appium** – for mobile automation (Android)
- **TypeScript** – strongly typed scripting language
- **Mocha** – test framework
- **Allure Reporter** – for test reports

---

## 📂 Project Structure
---
├─ apps/
    ├─ android/
    ├─ ios/
├─ src/
│ ├─ config/
│ │ ├─ config.android.json # Android capabilities
│ │ └─ config.ios.json # iOS capabilities (currently unsupported)
│ ├─ utils/
│ │ └─ logger.ts # Custom logger
├─ test/
│ ├─ specs/ # Test specs
│ └─ pageobjects/ # Page Object Model classes
├─ wdio.conf.ts # WDIO configuration
---

## 🔧 Configuration

The configuration file `wdio.conf.ts` dynamically loads platform-specific capabilities based on the environment variable `PLATFORM`.

- Default platform: **Android**
- iOS support: **not yet implemented**. Running tests with `PLATFORM=ios` will throw an error.

Capabilities are loaded from JSON files:

```ts
const PLATFORM = process.env.PLATFORM?.toLowerCase() || "android";
const configFilePath = PLATFORM === "android"
    ? "./src/config/config.android.json"
    : "./src/config/config.ios.json";
const platformConfig = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
const selectedCapability = platformConfig;
```

## 🏁 Running Tests
Run on Android (default)
```
npx wdio run wdio.conf.ts
```
or you can use 
```
npm test
```

Run explicitly with platform variable
```
PLATFORM=android npx wdio run wdio.conf.ts
```

#### ⚠️ iOS platform is currently not supported:

# 🧪 Test Lifecycle Hooks

The framework logs key events:

before – logs the start of the test run

beforeSuite – logs suite name

beforeTest – logs test start

afterTest – logs test results and captures screenshots on failure

```ts
before: async () => logger.info("🔧 Test run started");
beforeSuite: (suite) => logger.info(`📁 Suite: ${suite.title}`);
beforeTest: (test) => logger.info(`🧪 Test start: ${test.title}`);
afterTest: async (test, context, { error, passed }) => {
    if (!passed) {
        const screenshot = await browser.takeScreenshot();
        logger.error(`🔴 Test FAILED: ${test.title} | Error: ${error?.message}`);
    } else {
        logger.info(`🟢 Test passed: ${test.title}`);
    }
};

```

# ⚡ Features

```
⚡ Dynamic platform configuration using JSON files
⚡ Custom logger for structured reporting
⚡ Page Object Model for maintainable tests
⚡ Retry mechanisms, custom waits, and screenshot capture for better stability
⚡ Integration with Allure Reporter for detailed test reports
```

# Notes

Make sure Appium server is running on port 4723 before executing tests.

Ensure the application path in config.android.json points to a valid APK.

All test specs should be placed under test/specs/**/*.ts.