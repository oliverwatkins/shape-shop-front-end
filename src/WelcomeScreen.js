import * as React from 'react';
import {connect} from "react-redux";

import welcome from './assets/img/hops.jpg';

export class Overview extends React.PureComponent {
	render() {
		return (
			<div className={"welcome"} >
				Welcome to the online shop. Click on Order
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.products,
	};
};

export default connect(
	mapStateToProps,
	null,
)(Overview);
