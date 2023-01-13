
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


Shape shop

uses netlify for deployment.

1. npm run build
2. netlify deploy (make sure build directory points to ./build   !!)





https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/


https://63be42470416b94a5463e5b6--alpenhof3.netlify.app/



