import React from 'react';


// DO NOT DELETE

//override browser router when running jest test. Effectively disabble it.
const reactRouterDom = require("react-router-dom")
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>

module.exports = reactRouterDom