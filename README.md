# BMH231 Ödev 1

BMH231 ödevi için Node.js'in yerleşik `http` modülü ve `dayjs` kullanılarak yazılmış küçük bir HTTP sunucusu.

## Gereksinimler

- Node.js LTS ve npm

## Kurulum ve çalıştırma

```bash
git clone https://github.com/ismailsvc/bmh231-odev1.git
cd bmh231-odev1
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Farklı bir terminalden, örneğin `curl -i http://localhost:3000/api/agep` komutuyla istek gönderebilirsiniz. Windows PowerShell'de `npm` komutu çalıştırma ilkesi nedeniyle engellenirse `npm.cmd start` kullanın.

## Desteklenen yollar

| Yol | Yöntem | Yanıt |
| --- | --- | --- |
| `/` | GET | Ana sayfa (HTML) |
| `/hakkimda` | GET | Tanıtım sayfası (HTML) |
| `/api/ders` | GET | Ders bilgileri (JSON) |
| `/api/agep` | GET | 01.11.2026 son teslim tarihi ve kalan gün (JSON) |
| Diğer yollar | GET | 404, `Sayfa bulunamadı` |
| Tüm yollar | GET dışı | 405, `Allow: GET` |

## Kişiselleştirme

`server.js` içindeki `studentName`, `introduction` ve `courseDay` değerleri sayfa ve ders API'sinde kullanılır. `/api/agep` kalan gün sayısını çalıştırıldığı tarihe göre `dayjs` ile hesaplar.