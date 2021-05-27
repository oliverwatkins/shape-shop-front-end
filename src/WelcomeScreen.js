import * as React from 'react';
import {connect} from "react-redux";

import welcome from './assets/img_DEPRECATED/welcome.jpg';

export class Overview extends React.PureComponent {
	render() {
		return (
			<div>
				<imgs style={{width:"100%"}} src={welcome} alt="Welcome" />
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
