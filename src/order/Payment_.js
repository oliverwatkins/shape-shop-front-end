import * as React from 'react';
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faArrowCircleLeft, faArrowCircleRight, faCreditCard} from "@fortawesome/free-solid-svg-icons";



export class Payment_ extends React.PureComponent {
	render() {
		return (
			<div style={{display: "flex"}} className="wizardPanel">

				<Link to="/order/address">
					<FontAwesomeIcon icon={faArrowCircleLeft} style={{fontSize: "100px", color: "gray"}}/>
				</Link>


				<div className="col-50">
					<h3>Payment</h3>
					<label htmlFor="fname">Accepted Cards</label>
					<div className="icon-container">
						<FontAwesomeIcon icon={faCreditCard} style={{fontSize: "60px", color: "navy"}}/>
					</div>
					<label htmlFor="cname">Name on Card</label>
					<input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
					<label htmlFor="ccnum">Credit card number</label>
					<input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
					<label htmlFor="expmonth">Exp Month</label>
					<input type="text" id="expmonth" name="expmonth" placeholder="September"/>

					<div className="row">
						<div className="col-50">
							<label htmlFor="expyear">Exp Year</label>
							<input type="text" id="expyear" name="expyear" placeholder="2018"/>
						</div>
						<div className="col-50">
							<label htmlFor="cvv">CVV</label>
							<input type="text" id="cvv" name="cvv" placeholder="352"/>
						</div>
					</div>
				</div>

				<div className={"aside"}>
					<Link to="/order/summary">
						<FontAwesomeIcon icon={faArrowCircleRight} style={{fontSize: "100px", color: "gray"}}/>
					</Link>
				</div>
			</div>
		);
	}
}

export default Payment_;
