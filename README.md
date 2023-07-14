
### Run in IDE

build
start

TODO!!! bug with CRA and TS https://github.com/facebook/create-react-app/issues/9868
comment out tsconfig.json before running start.


### Run mock mode in Docker Container with NGINX (app server)

make sure mock_mode is "true" in constants.js
export const MOCK_MODE = true;


docker build -t shape-shop-front-end:1.1 .

docker run -d -p 8788:80 shape-shop-front-end:1.1 

website should be accesible :

http://localhost:8788/


### NETLIFY

1. check CONSTANTS.TS. Makes sure baseURL is pointing to the correct azure instance. Currently it is :
"https://shape-shop-app.happywave-c1a7da5f.westeurope.azurecontainerapps.io/"
2. npm run build
3. netlify deploy (make sure build directory points to ./build   !!)

latest is :
https://64b10cd334d49621b798aed1--alpenhof3.netlify.app




