const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DIR = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http.createServer((req, res) => {
  let url = req.url === "/" ? "/index.html" : req.url;
  let fp = path.join(DIR, url);
  fp = path.normalize(fp);

  if (!fp.startsWith(DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h2>404 - 文件未找到</h2>");
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`✅ 电伴热AI助手已启动`);
  console.log(`   本地访问: http://localhost:${PORT}`);
  console.log(`   退出: Ctrl+C`);
});
