import Joi from 'joi';
import { RequestHandler } from 'express';
import { NOT_FOUND_WEBSITE_MESSAGE, websites } from '../constants';
import { validateWebsite } from '../validations';

export const getAllWebsites: RequestHandler = (req, res, next) => {
	res.send(websites);
};

export const getWebsite: RequestHandler = (req, res, next) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	res.send(website);
};

export const createWebsite: RequestHandler = (req, res, next) => {
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
};

export const updateWebsite: RequestHandler = (req, res, next) => {
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
};

export const deleteWebsite: RequestHandler = (req, res, next) => {
	const website = websites.find(website => website.id === +req.params.id);

	if (!website) {
		res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
		return;
	}

	const index = websites.indexOf(website);
	websites.splice(index, 1);
	res.send(website);
};
