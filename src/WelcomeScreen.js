import * as React from 'react';
import ProductsPanel from "./ProductsPanel";
import {createFetchProductsAction} from "./order/redux/productActions";
import connect from "react-redux/es/connect/connect";

import welcome from './assets/img/welcome.jpg';

// import img from './file.png';


export class Overview extends React.PureComponent {
	render() {
		return (
			<div>
				<img className="wee-card__img" style={{width:"100%"}} src={welcome} alt="  " />
				{/*<ProductsPanel items={this.props.products.items}/>*/}
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
