import app from './app';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at ${host}:${port}`); // eslint-disable-line
