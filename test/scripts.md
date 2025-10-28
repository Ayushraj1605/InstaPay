# Test Scripts for InstaPay

All test code is in the `test/` directory and imports the app code from `src/`.

This project exposes convenient npm scripts (see `package.json`) for working with tests locally and in CI.

Install dependencies (PowerShell):

```powershell
npm install
```

Run all tests (headless):

```powershell
npm run test
```

Run tests in watch mode / interactive development:

```powershell
npm run test:watch
```

Open Vitest UI (browser-based test runner):

```powershell
npm run test:ui
```

Generate coverage report:

```powershell
npm run coverage
```

Run a single test file (example):

```powershell
npx vitest run test/contracts.test.ts
```

Notes
- If you see missing module errors, ensure `npm install` completed successfully.
- The `test` scripts are powered by Vitest with a `jsdom` environment configured in `package.json`.
- Use `npm run test:watch` while developing to get a fast feedback loop and re-run tests on file changes.

CI recommendation
- Use `npm ci` to install dependencies in CI, then run the following checks:

```powershell
npm ci
npm run build   # includes tsc type checking
npm run lint
npm run test
```

This order ensures type errors are caught before running tests and lint enforces code quality.
