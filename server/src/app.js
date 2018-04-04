import path from 'path';
import express from 'express';

const app = express();

const publicPath = express.static(path.join(__dirname, '../../app/build'));
const indexPath = path.join(__dirname, '../../app/build/index.html');

app.use(publicPath);

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

export default app;
