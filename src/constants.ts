import { Website } from './types';

export const NOT_FOUND_WEBSITE_MESSAGE = 'The website with the given ID was not found.';

export const websites: Website[] = [
	{ id: 1, name: 'google', url: 'https://google.com' },
	{ id: 2, name: 'youtube', url: 'https://youtube.com' },
	{ id: 3, name: 'facebook', url: 'https://facebook.com' },
];
