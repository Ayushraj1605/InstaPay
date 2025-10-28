# Test Scripts for InstaPay

All test code is in the `test/` directory and does not affect production code.

## Install Test Dependencies

Run this in PowerShell (from `stable-pay`):

```powershell
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Run All Tests

```powershell
npx vitest run
```

## Run Tests with UI (watch mode)

```powershell
npx vitest --ui
```

## Run Coverage Report

```powershell
npx vitest run --coverage
```

## Notes
- All test files are in `test/` and import from `src/`.
- No changes are made to production code.
- If you see missing module errors, ensure dependencies are installed.
