// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// const STAGING_API = 'https://api.wee30.wee-staging.com';
// const LAST_PRODUCTION_API = 'https://api.wee.com/api';
// const STAGING_API = 'http://192.168.19.67:8080';


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
