import express from 'express';
import morgan from 'morgan';
import ApiRoutes from './routes/api';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', ApiRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
