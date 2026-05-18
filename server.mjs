import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import enforce from 'express-sslify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

if (process.env.NODE_ENV === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use((_req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.static(path.normalize(path.join(__dirname, 'dist'))));
app.use('/', express.static(path.normalize(path.join(__dirname, 'dist'))));
app.get('/*', (_request, response) => {
  response.sendFile(path.normalize(path.join(__dirname, 'dist/index.html')));
});

const isMain = import.meta.url === pathToFileURL(process.argv[1] || '').href;
if (isMain) {
  const port = Number(process.env.PORT);
  app.listen(port, () => {
    console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
  });
}

export default app;
