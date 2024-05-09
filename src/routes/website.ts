import Joi from 'joi';
import { Router } from 'express';

// TYPES
interface Website {
	id: number;
	name: string;
	url: string;
}

// CONSTANTS
const NOT_FOUND_WEBSITE_MESSAGE = 'The website with the given ID was not found.';

const websites: Website[] = [
	{ id: 1, name: 'google', url: 'https://google.com' },
	{ id: 2, name: 'youtube', url: 'https://youtube.com' },
	{ id: 3, name: 'facebook', url: 'https://facebook.com' },
];

// VALIDATION
function validateWebsite(website: unknown) {
	const schema = Joi.object({
		name: Joi.string().required(),
		url: Joi.string().required(),
	});

	return schema.validate(website);
}

// ROUTER
const router = Router();

router.get('/read_all', (req, res) => {
	res.send(websites);
});

router.get('/read/:id', (req, res) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	res.send(website);
});

router.post('/create', (req, res) => {
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

router.put('/update/:id', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	const index = websites.indexOf(website);
	websites.splice(index, 1);
	res.send(website);
});

export default router;
