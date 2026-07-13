const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Sahifa topilmadi</h1><p>URL: ' + req.url + '</p>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server xatosi: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('\n🚀 ==========================================');
  console.log('   MedCare Server Ishga Tushdi!');
  console.log('==========================================\n');
  console.log('📍 Linklar:\n');
  console.log(`   🏠 Bosh sahifa:        http://localhost:${PORT}/`);
  console.log(`   🔐 Login:              http://localhost:${PORT}/pages/login.html`);
  console.log(`   👨‍💼 Admin Panel:        http://localhost:${PORT}/pages/admin-panel.html`);
  console.log(`   💊 Dorixona (Kassir):  http://localhost:${PORT}/pages/pharmacy-admin.html`);
  console.log(`   👥 HR Dashboard:       http://localhost:${PORT}/pages/hr-dashboard.html`);
  console.log('\n⚡ Server to\'xtatish: Ctrl + C\n');
});
