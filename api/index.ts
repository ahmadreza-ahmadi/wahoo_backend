import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose
	.connect(process.env.MONGODB_CONNECTION_KEY!)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Could not connect to MongoDB', err));

const websiteSchema = new mongoose.Schema({
	name: String,
	url: String,
});

const Website = mongoose.model('Website', websiteSchema);

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => res.send('Express on Vercel'));

app.get('/website/read_all', async (req, res, next) => {
	const result = await Website.find();
	res.send(result);
});

app.get('/website/read/:id', async (req, res, next) => {
	try {
		const website = await Website.findById(req.params.id);

		if (!website) {
			res.status(404).send('No website found with the given id.');
			return;
		}

		res.send(website);
	} catch (error) {
		res.send(error);
	}
});

app.post('/website/create', async (req, res, next) => {
	const website = new Website({
		name: req.body.name,
		url: req.body.url,
	});

	const result = await website.save();
	res.send(result);
});

app.put('/website/update/:id', async (req, res, next) => {
	try {
		const website = await Website.findById(req.params.id);

		if (!website) {
			res.status(404).send('No website found with the given id.');
			return;
		}

		website.set({ ...website, ...req.body });

		const result = await website.save();
		res.send(result);
	} catch (error) {
		res.send(error);
	}
});

app.delete('/website/delete/:id', async (req, res, next) => {
	try {
		const result = await Website.findByIdAndDelete(req.params.id);

		res.send(result);
	} catch (error) {
		res.send(error);
	}
});

app.listen(3000, () => console.log(`Listening on port 3000...`));

export default app;
