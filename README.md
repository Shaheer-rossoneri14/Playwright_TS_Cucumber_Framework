# Playwright Cucumber Automation Framework using TypeScript

## Overview

This is a ready-to-use test automation framework built with Cucumber, Playwright, and TypeScript. It enables Behavior-Driven Development (BDD) for testing modern web applications, offering support for UI and API testing across multiple browsers, along with parallel test execution.

## Features

- **Ready-to-use Framework**: Fully set up to start writing and executing tests immediately.
- **Multi-Browser Support**: Run tests across Chromium, Firefox, WebKit, and Microsoft Edge.
- **Comprehensive Testing**: Supports UI interactions, API testing, and complex end-to-end workflows.
- **Parallel Execution**: Speed up testing by running scenarios in parallel.
- **Cucumber Reporting**: Generate detailed HTML and JSON reports for clear test results.
- **TypeScript Integration**: Write and maintain tests with TypeScript’s type safety and advanced features.
- **Environment Configuration**: Manage different test environments seamlessly using `.env` files.

## Installation

To get started with the framework, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Shaheer-rossoneri14/Playwright_TS_Cucumber_Framework.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Playwright_TS_Cucumber_Framework
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

Once the installation is complete, the framework is ready to be used for writing and executing tests.


## Project Structure
Here's a brief overview of the project structure:

playwright_cucumber_framework/
│
├── constants/                # Constants used across the framework for configuration or data
├── features/                 # Contains feature files, step definitions, and support hooks
│   ├── step_definitions/     # Maps Gherkin steps to code
│   ├── support/              # Hooks and global setup/teardown steps
│   ├── uiFeature.feature      # Example UI feature file
│   └── apiFeature.feature     # Example API feature file
│
├── pageObjects/              # Page Object Model (POM) files for UI elements and actions
├── utils/                    # Utility functions and libraries
├── reports/                  # Generated test reports
├── screenshots/              # Screenshots captured during test execution
├── package.json              # Project dependencies and scripts
├── cucumber.js               # Cucumber configuration file
├── reporter.ts               # Custom reporter configuration
└── .env                      # Environment configuration


## Usage


### 1. Creating Feature Files
Define your application's behavior using Cucumber feature files, placed under the `features/` directory. Each feature file represents a functionality of your application and contains one or more scenarios written in Gherkin syntax.

- **Example**: Use the `loginLogout.feature` and `apiFeature.feature` files as templates to structure your tests with Gherkin keywords like `Given`, `When`, and `Then`.

### 2. Writing Step Definitions
Create corresponding step definitions in the `features/step_definitions/` directory. These files map Gherkin steps to actual code that interacts with your application.

- **Example**: The `step_definitions/` folder contains sample step definitions that show how to handle UI actions and API calls using Playwright.

### 3. Implementing Page Object Models
For UI testing, implement the Page Object Model (POM) pattern to manage web elements and actions efficiently. Create separate files for each page of your application under the `pageObjects/` directory.

### 4. Managing Page Objects with `poManager.ts`
Centralize the instantiation and management of your page objects by adding them to the `poManager.ts` file. This file acts as a factory, providing access to different page objects throughout your tests.

- **Example**: When writing step definitions, instead of directly creating instances of page objects, use `poManager` to access them. This ensures that all page objects are managed consistently and are easily accessible.

### 5. API Testing: Organizing Request and Response Data
For API testing, organize your request and response payloads in JSON format. Place these files under a dedicated `testdata` directory within your project.

### 6. Writing API Step Definitions
For API testing, write step definitions that handle API requests and validate responses. You can include these step definitions in the same `step_definitions/` directory used for UI tests or in a separate file specifically for API steps.

### 7. Understanding the Demo Files
Before writing your tests, review the provided demo files in the project:

- **Feature Files**: The `loginLogout.feature` and `apiFeature.feature` files offer a blueprint for structuring your test scenarios.
- **Step Definitions**: Sample step definition files illustrate how to map Gherkin steps to TypeScript code.
- **Page Objects**: Example page objects demonstrate the correct usage of the POM pattern, including how to handle locators and methods.

### 8. Executing Tests
Once your feature files, step definitions, and page objects are set up, execute your tests using the provided scripts in the `package.json`.

- **Example**: To run UI tests on Chrome, use the following command:
```bash
npm run test-ui-chrome
```

### 9. Running Specific Feature Files/Scenarios
To run specific feature files or scenarios, add tags to your feature files/scenarios and configure them in the cucumber.js file. This allows for selective test execution based on tags.

### 10. Reporting
The cucumber-html-reporter is used to generate reports, which are automatically created in the reports/ folder after test execution. In case of failed scenarios, screenshots are saved to the screenshots/ folder with the naming convention screenshot-{scenarioName}-{currentDate}.png.