# 🚀 Quick Setup Guide for InstaPay

## ⚠️ Authentication Error Fix

If you're getting the "Failed to verify login code" error, it's because the thirdweb API credentials are not configured. Here's how to fix it:

## 1. Create Environment File

Create a `.env` file in the project root with your actual credentials:

```bash
# On macOS / Linux (or Git Bash on Windows)
cp env.example .env

# On Windows PowerShell use:
Copy-Item -Path env.example -Destination .env

# Or using the cross-platform npm tool (if available):
npx cpx env.example .env
```

Then edit `.env` with your real values:

```env
# thirdweb Configuration (REQUIRED)
VITE_THIRDWEB_CLIENT_ID=your_actual_thirdweb_client_id

# Supabase Configuration (REQUIRED for user data)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# The rest can stay as defaults for testing
VITE_ETHEREUM_USDC_ADDRESS=0xA0b86a33E6776e2d98D24083B2E4AB4E8fCD5918
VITE_POLYGON_USDC_ADDRESS=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
VITE_BASE_USDC_ADDRESS=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913
```

## 2. Get thirdweb Client ID

1. Go to [thirdweb.com](https://thirdweb.com)
2. Create an account and new project
3. Go to Settings → API Keys
4. Copy your **Client ID** (not secret key)
5. Add it to your `.env` file

## 3. Set up Supabase (for user storage)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings → API
4. Add them to your `.env` file
5. Run the SQL schema from `sql/supabase-schema.sql` in the Supabase SQL editor

## 4. Test the Authentication

1. Restart the dev server: `npm run dev`
2. Open the app in your browser
3. Try logging in with your email
4. Check the browser console for any remaining errors

## ✅ Running tests & verification

After configuring your environment variables and installing dependencies, run the test suite to verify everything works.

Install dependencies (PowerShell):

```powershell
npm install
```

Run tests (headless):

```powershell
npm run test
```

Run tests in watch mode (interactive):

```powershell
npm run test:watch
```

Open Vitest UI:

```powershell
npm run test:ui
```

Run coverage report:

```powershell
npm run coverage
```

If tests fail, open `npm run test:watch` or `npm run test:ui` to get more details and iterate locally.

## 🔧 Troubleshooting

- **"Client ID is not set"**: Make sure your `.env` file exists and has the correct variable names
- **"404" error**: Double-check your thirdweb Client ID
- **"403" error**: Make sure your domain is allowlisted in thirdweb dashboard
- **Network errors**: Check your internet connection and thirdweb service status

## 📝 Next Steps

Once authentication works:
1. Set up your Supabase database
2. Choose a username
3. Start sending test payments!

The app will show you your wallet balances and let you send stablecoins to other users by username.
