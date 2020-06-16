import React from 'react';


// TODO is this really needed?

//override browser router when running jest test. Effectively disabble it.
const reactRouterDom = require("react-router-dom")
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>

module.exports = reactRouterDom