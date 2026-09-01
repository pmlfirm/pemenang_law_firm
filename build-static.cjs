/**
 * Build script for Niaga Hoster static export.
 * Temporarily moves the /app/api folder (which uses force-dynamic)
 * so Next.js static export doesn't choke on it, then restores it after.
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const apiDir = path.join(__dirname, 'app', 'api')
const apiBackup = path.join(__dirname, '_api_backup')

console.log('🔧 Preparing static build for Niaga Hoster...\n')

// Step 1: Temporarily move /app/api out of the way
if (fs.existsSync(apiDir)) {
  fs.renameSync(apiDir, apiBackup)
  console.log('   Moved app/api → _api_backup')
}

try {
  // Step 2: Run the static build with Webpack (--no-turbo) to ensure clean filenames without tildes (~)
  execSync('npx next build --no-turbo', {
    stdio: 'inherit',
    env: { ...process.env, BUILD_MODE: 'static' },
  })
  // Step 2b: Ensure updated .htaccess is copied to out/ folder
  const htaccessPublic = path.join(__dirname, 'public', '.htaccess')
  const htaccessOut = path.join(__dirname, 'out', '.htaccess')
  if (fs.existsSync(htaccessPublic)) {
    fs.copyFileSync(htaccessPublic, htaccessOut)
    console.log('   Copied updated public/.htaccess → out/.htaccess')
  }

  console.log('\n✅ Static build complete! Output is in the "out/" folder.')
  console.log('   Upload the contents of out/ to public_html on Niaga Hoster.\n')
} finally {
  // Step 3: Restore /app/api
  if (fs.existsSync(apiBackup)) {
    fs.renameSync(apiBackup, apiDir)
    console.log('   Restored _api_backup → app/api')
  }
}
