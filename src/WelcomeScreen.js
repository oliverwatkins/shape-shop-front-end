import * as React from 'react';
import {connect} from "react-redux";

// import welcome from './assets/img/ezgif-5-e18193c8ba03.png';

export class Overview extends React.PureComponent {
	render() {
		return (
			<div>
				Welcome to the online shop. Click on Order
				{/*<img className="wee-card__img" style={{width:"100%"}} src={welcome} alt="  " />*/}
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
