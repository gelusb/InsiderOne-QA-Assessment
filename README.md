
# QA Engineer Assessment – Automation Framework (Playwright + TypeScript + API + Load Testing)

This repository contains a complete automation framework built for the QA Engineer Assessment.  
It includes:

- UI Automation using Playwright + TypeScript  
- API Testing using Axios  
- Load Testing using Apache JMeter  
- Page Object Model (POM) architecture  
- Reusable Cypress‑style commands  
- Cross‑browser execution  
- Screenshots on failure  
- Allure reporting  
- Data‑driven testing  
- Selectors separated for maintainability  

The project is designed to be clean, scalable, and production‑ready.

---

## 1. Project Structure

```
insider-qa-assessment/
├─ playwright.config.ts
├─ tsconfig.json
├─ package.json
├─ tests/
│  ├─ ui/
│  │  ├─ pages/
│  │  │  ├─ BasePage.ts
│  │  │  ├─ HomePage.ts
│  │  │  ├─ CareersPage.ts
│  │  │  ├─ QaJobsPage.ts
│  │  │  └─ LeverPage.ts
│  │  ├─ selectors/
│  │  │  ├─ homeSelectors.ts
│  │  │  ├─ careersSelectors.ts
│  │  │  ├─ qaJobsSelectors.ts
│  │  │  └─ leverSelectors.ts
│  │  ├─ commands/
│  │  │  └─ uiCommands.ts
│  │  └─ test_insider_careers.spec.ts
│  ├─ api/
│  │  └─ petstore_crud.spec.ts
│  ├─ data/
│  │  ├─ qa_filters.json
│  │  └─ pet_data.json
│  └─ load/
│     └─ n11_search_test_plan.jmx   (added separately)
└─ README.md
```

---

## 2. Cloning the Repository

```
git clone <your-repo-url>
cd insider-qa-assessment
```

---

## 3. Installation & Setup

### Install Node.js  
Download from: https://nodejs.org/en

Verify installation:

```
node -v
npm -v
```

### Install dependencies

```
npm install
```

### Install Playwright browsers

```
npx playwright install
```

---

## 4. Running Tests

### Run all tests

```
npm test
```

### Run only UI tests

```
npm run test:ui
```

### Run only API tests

```
npm run test:api
```

### Run tests in headed mode (visible browser)

```
npm run test:headed
```

### Debug mode (Playwright Inspector)

```
npm run test:debug
```

---

## 5. Cross‑Browser Testing

Playwright supports Chromium, Firefox, and WebKit.

Run UI tests in Chromium:

```
npx playwright test --browser=chromium
```

Run UI tests in Firefox:

```
npx playwright test --browser=firefox
```

Run UI tests in WebKit:

```
npx playwright test --browser=webkit
```

---

## 6. Screenshots on Failure

Playwright automatically captures:

- Screenshots  
- Trace files  
- Videos (if enabled)

Artifacts are stored under:

```
test-results/
```

Each failing test gets its own folder with all debugging assets.

---

## 7. Page Object Model (POM) Architecture

This project follows a clean, scalable POM structure.

### BasePage  
Contains shared navigation and utilities.

### HomePage  
Validates Insider homepage blocks.

### CareersPage  
Navigates to QA careers and clicks “See all QA jobs”.

### QaJobsPage  
Handles filtering, job validation, and clicking “View Role”.

### LeverPage  
Validates redirect to Lever application form.

### Selectors  
Each page has its own selector file for maintainability.

### Commands  
Reusable Cypress‑style helpers:
- clickAndWait  
- assertVisible  
- selectDropdown  

This keeps tests clean and readable.

---

## 8. UI Test Scenario (Insider)

The UI test covers:

1. Open Insider homepage  
2. Validate main blocks  
3. Navigate to QA careers  
4. Click “See all QA jobs”  
5. Filter by:
   - Istanbul, Turkey  
   - Quality Assurance  
6. Validate:
   - Job list exists  
   - Each job has correct position, department, location  
7. Click “View Role”  
8. Validate redirect to Lever application form  

Selectors will be updated after UI inspection.

---

## 9. API Testing (Petstore Swagger)

API tests use Axios and cover:

### Positive Scenarios
- Create pet  
- Get pet  
- Update pet  
- Delete pet  

### Negative Scenario
- Get non‑existent pet (expect 404)

Run API tests:

```
npm run test:api
```

---

## 10. Load Testing (JMeter)

The load test evaluates the search module of n11.com.

### Scenario:
1. Open homepage  
2. Perform search for "telefon"  
3. Validate:
   - Response code = 200  
   - Search term appears  
   - Product list container exists  

### Configuration:
- Users: 1  
- Loop count: 5  
- Ramp-up: 1 second  

### JMeter test file:
Located under:

```
tests/load/n11_search_test_plan.jmx
```

### How to run:
1. Open JMeter  
2. Load the `.jmx` file  
3. Click Start  
4. View results in:
   - Summary Report  
   - Aggregate Report  

---

## 11. Allure Reporting

### Install Allure dependencies

```
npm install --save-dev allure-playwright
```

### Generate Allure results

Run tests:

```
npx playwright test
```

### Generate Allure report

```
npx allure generate ./allure-results --clean
```

### Open Allure report

```
npx allure open ./allure-report
```

---

## 12. Scripts (package.json)

```
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test tests/ui",
  "test:api": "playwright test tests/api",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "allure:generate": "allure generate ./allure-results --clean",
  "allure:open": "allure open ./allure-report"
}
```

---

=======
# InsiderOne-QA-Assessment
qa assessment 
>>>>>>> 2ea4e5bff7d6868c87bf3b116b1b3a9702cd354a
