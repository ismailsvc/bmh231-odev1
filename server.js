const http = require('node:http');
const dayjs = require('dayjs');

const PORT = 3000;
const studentName = 'İsmail Savcı';
const introduction = 'Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Web programlama ve Node.js ile sunucu geliştirme konularını öğreniyorum.';
const courseDay = 'Cuma';

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = requestUrl.pathname;

  console.log(`${request.method} ${pathname}`);

  if (request.method !== 'GET') {
    response.writeHead(405, {
      Allow: 'GET',
      'Content-Type': 'text/plain; charset=utf-8',
    });
    response.end('Yalnizca GET istegi destekleniyor.');
    return;
  }

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BMH231 | Web Sunucusu</title>
    <style>
      :root { color-scheme: light; font-family: Georgia, "Times New Roman", serif; color: #172b2a; background: #f2f4ed; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 32px 20px; }
      main { width: min(720px, 100%); border-top: 5px solid #d15a38; padding: 34px clamp(22px, 6vw, 56px); background: #fffefa; box-shadow: 0 18px 48px #172b2a12; }
      p { line-height: 1.7; color: #52615a; }
      h1 { margin: 8px 0 16px; font-size: clamp(2rem, 6vw, 3.2rem); }
      .eyebrow { color: #b54b31; font: 700 12px/1.4 Arial, sans-serif; letter-spacing: 0.12em; text-transform: uppercase; }
      nav { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
      a { color: #fffefa; background: #17665d; padding: 11px 15px; text-decoration: none; font: 700 14px Arial, sans-serif; }
      a:hover, a:focus-visible { background: #124b45; }
      code { color: #b54b31; }
    </style>
  </head>
  <body>
    <main>
      <div class="eyebrow">BMH231 · Web'in Temelleri</div>
      <h1>Web Programlama Projem</h1>
      <p>Node.js'in yerleşik HTTP modülüyle hazırlanmış küçük sunucuma hoş geldiniz. Bu ana sayfa HTML olarak sunulur; ders ve tarih bilgileri JSON API'lerinde yer alır.</p>
      <nav aria-label="Sunucu sayfaları">
        <a href="/hakkimda">Hakkımda</a>
        <a href="/api/ders">Ders API</a>
        <a href="/api/agep">AGEP API</a>
      </nav>
    </main>
  </body>
</html>`);
    return;
  }

  if (pathname === '/hakkimda') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
<html lang="tr">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Hakkımda</title></head>
  <body>
    <main>
      <h1>${studentName}</h1>
      <p>${introduction}</p>
      <a href="/">Ana sayfaya dön</a>
    </main>
  </body>
</html>`);
    return;
  }

  if (pathname === '/api/ders') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ kod: 'BMH231', ad: "Web'in Temelleri ve Geliştirme Ekosistemi", gun: courseDay }));
    return;
  }

  if (pathname === '/api/agep') {
    const deadline = dayjs('2026-11-01');
    const remainingDays = deadline.startOf('day').diff(dayjs().startOf('day'), 'day');
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ sonTeslim: deadline.format('DD.MM.YYYY'), kalanGun: remainingDays }));
    return;
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Sayfa bulunamadı');
});

server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde calisiyor.`);
});



