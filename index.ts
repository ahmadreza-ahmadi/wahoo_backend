import express from 'express';
import Joi from 'joi';
const morgan = require('morgan');
import type { Website } from './index.type';
import { NOT_FOUND_WEBSITE_MESSAGE } from './index.constant';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const websites: Website[] = [
	{ id: 1, name: 'google', url: 'https://google.com' },
	{ id: 2, name: 'youtube', url: 'https://youtube.com' },
	{ id: 3, name: 'facebook', url: 'https://facebook.com' },
];

app.get('/api/website/read_all', (req, res) => {
	res.send(websites);
});

app.get('/api/website/read/:id', (req, res) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	res.send(website);
});

app.post('/api/website/create', (req, res) => {
	const { error } = validateWebsite(req.body);
	if (error) {
		res.status(400).send(error.message);
		return;
	}

	const newWebsite = {
		id: websites.length + 1,
		name: req.body.name,
		url: req.body.url,
	};

	websites.push(newWebsite);
	res.send(newWebsite);
});

app.put('/api/website/update/:id', (req, res) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	const { error } = validateWebsite(req.body);
	if (error) {
		res.status(400).send(error.message);
		return;
	}

	const updatedWebsite = { ...website, ...req.body };

	websites[websites.indexOf(website)] = updatedWebsite;
	res.send(updatedWebsite);
});

app.delete('/api/website/delete/:id', (req, res) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	const index = websites.indexOf(website);
	websites.splice(index, 1);
	res.send(website);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateWebsite(website: unknown) {
	const schema = Joi.object({
		name: Joi.string().required(),
		url: Joi.string().required(),
	});

	return schema.validate(website);
}
