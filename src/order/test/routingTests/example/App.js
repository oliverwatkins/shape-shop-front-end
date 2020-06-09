import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


export default class App extends Component {
//apparantly this dude thinks he can get routing testing working. But this example doesnt work
	// https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route path="/portfolio" component={PortfolioPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

function NotFoundPage() {
		return (
			<div>Not Found Page</div>
		);
}

function PortfolioPage() {
	return (
		<div>PortfolioPage</div>
	);
}

function LandingPage() {
	return (
		<div>LandingPage</div>
	);
}


