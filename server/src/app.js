import path from 'path';
import express from 'express';

const app = express();

// serving static content for dev purpose
const staticPath = express.static(path.join(__dirname, '../../app/build'));
const indexFile = path.join(__dirname, '../../app/build/index.html');
app.use(staticPath);
app.get('/', (req, res) => {
  res.sendFile(indexFile);
});
// end static content

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

export default app;
