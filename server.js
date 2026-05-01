import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the TanStack Start SSR handler
import appServer from './dist/server/server.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  // 1. Simple static file serving for dist/client
  const urlPath = req.url.split('?')[0];
  let staticFilePath = path.join(__dirname, 'dist', 'client', urlPath);
  
  // Try exact match or index.html for root
  if (urlPath === '/') {
    staticFilePath = path.join(__dirname, 'dist', 'client', 'index.html');
  }

  if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
    const ext = path.extname(staticFilePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.txt': 'text/plain',
    };
    
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(staticFilePath).pipe(res);
    return;
  }

  try {
    // 2. Adapt Node.js http.IncomingMessage to standard Web Request
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);
    
    const requestOptions = {
      method: req.method,
      headers: req.headers,
    };
    
    // Only add body if not GET/HEAD
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      requestOptions.body = Buffer.concat(chunks);
    }
    
    const request = new Request(url, requestOptions);
    
    // 3. Call the TanStack Start handler
    const response = await appServer.fetch(request);
    
    // 4. Adapt Web Response back to Node.js http.ServerResponse
    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    
    response.headers.forEach((value, key) => {
      // Append rather than set to handle multiple Set-Cookie headers correctly
      if (key.toLowerCase() === 'set-cookie') {
        let existing = res.getHeader('set-cookie') || [];
        if (!Array.isArray(existing)) existing = [existing];
        res.setHeader('set-cookie', [...existing, value]);
      } else {
        res.setHeader(key, value);
      }
    });
    
    // Stream body to response
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (err) {
    console.error('Server error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    }
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});
