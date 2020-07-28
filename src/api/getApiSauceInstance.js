// a library to wrap and simplify api calls
import apisauce from 'apisauce';

const STAGING_API = 'http://localhost:8080';

// http://localhost:8080/products


const getApiSauceInstance = (baseURL= STAGING_API) => {

	let locale = 'en';
	locale = locale.split('-')[0];
	if (locale && locale.toLocaleLowerCase) {
		locale = locale.toLocaleLowerCase();
	}

	return apisauce.create({
		// base URL is read from the "constructor"
		baseURL,
		// here are some default headers
		headers: {
			'Cache-Control': 'no-cache',
			'Accept-Language': locale,
		},
		timeout: 60000,
	});
};

export default getApiSauceInstance;
