// Kleine webserver: http://localhost:3240 op de pc, en via wifi op je telefoon.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const PORT = 3240;

createServer(async (req, res) => {
  if (req.url !== '/' && !req.url.startsWith('/?')) { res.writeHead(404); return res.end(); }
  const html = await readFile(join(dir, 'index.html'));
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  res.end(html);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Geboortedatum-wiel draait\n\n  Op deze pc:      http://localhost:${PORT}`);
  for (const list of Object.values(networkInterfaces())) {
    for (const n of list ?? []) {
      if (n.family === 'IPv4' && !n.internal) console.log(`  Op je telefoon:  http://${n.address}:${PORT}   (zelfde wifi)`);
    }
  }
  console.log('\n  Sluit dit venster om te stoppen.\n');
});
