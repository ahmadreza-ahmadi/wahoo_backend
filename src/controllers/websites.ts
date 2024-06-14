import Joi from 'joi';
import { RequestHandler } from 'express';
import { NOT_FOUND_WEBSITE_MESSAGE, websites } from '../constants';
import { validateWebsite } from '../validations';
import mongoose from 'mongoose';

mongoose
	.connect('mongodb://localhost/wahoo')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Could not connect to MongoDB', err));

const websiteSchema = new mongoose.Schema({
	name: String,
	url: String,
});

const Website = mongoose.model('Website', websiteSchema);

export const getAllWebsites: RequestHandler = async (req, res, next) => {
	const result = await Website.find();
	res.send(result);
};

export const getWebsite: RequestHandler = async (req, res, next) => {
	try {
		const website = await Website.findById(req.params.id);

		if (!website) {
			res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
			return;
		}

		res.send(website);
	} catch (error) {
		res.send(error);
	}
};

export const createWebsite: RequestHandler = async (req, res, next) => {
	const website = new Website({
		name: req.body.name,
		url: req.body.url,
	});

	const result = await website.save();
	res.send(result);
};

export const updateWebsite: RequestHandler = async (req, res, next) => {
	try {
		const website = await Website.findById(req.params.id);

		if (!website) {
			res.status(404).send(NOT_FOUND_WEBSITE_MESSAGE);
			return;
		}

		website.set({ ...website, ...req.body });

		const result = await website.save();
		res.send(result);
	} catch (error) {
		res.send(error);
	}
};

export const deleteWebsite: RequestHandler = async (req, res, next) => {
	try {
		const result = await Website.findByIdAndDelete(req.params.id);

		res.send(result);
	} catch (error) {
		res.send(error);
	}
};
