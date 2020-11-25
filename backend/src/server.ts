import database from './database';
import app from './app';

database.sync();
console.log('Server running at 3306');

app.listen(3001); 
console.log('Server running at 3001');