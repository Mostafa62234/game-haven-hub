const fs = require('fs');
const https = require('https');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');
const urls = [...code.matchAll(/embed:\s*"([^"]+)"/g)].map(m => m[1]).filter(url => url.includes('silvergames.com'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'error' }));
  });
}

async function run() {
  console.log(`Checking ${urls.length} URLs...`);
  let fails = 0;
  for (const url of urls) {
    const res = await checkUrl(url);
    if (res.status !== 200) {
      console.log(`FAIL ${res.status}: ${url}`);
      fails++;
    }
  }
  console.log(`\nDone. ${fails} failed out of ${urls.length}.`);
}

run();
