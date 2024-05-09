import { object, string } from 'joi';

export function validateWebsite(website: unknown) {
	const schema = object({
		name: string().required(),
		url: string().required(),
	});

	return schema.validate(website);
}
