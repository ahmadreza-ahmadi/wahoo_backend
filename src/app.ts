import express from 'express';
import morgan from 'morgan';
import ApiRoutes from './routes/api';

const app = express();

app.use(express.json());
app.use('/api', ApiRoutes);

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	console.log('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
