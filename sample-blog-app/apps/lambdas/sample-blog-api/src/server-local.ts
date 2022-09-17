import 'reflect-metadata';
import { config } from 'dotenv';
const c = config();
import { app } from './server';

console.info('Env config: ', c.parsed);

const PORT: number = parseInt(c.parsed?.PORT || '4001');

app.listen(PORT, () => {
  console.info('Listening on http://localhost:%d', PORT);
});
