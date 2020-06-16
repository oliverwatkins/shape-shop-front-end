import * as React from 'react';
import {connect} from "react-redux";

import welcome from './assets/img/welcome.jpg';

export class Overview extends React.PureComponent {
	render() {
		return (
			<div>
				<img className="wee-card__img" style={{width:"100%"}} src={welcome} alt="  " />
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
