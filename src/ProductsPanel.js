import * as React from 'react';


export class ProductsPanel extends React.PureComponent {
	render() {
		let items = this.props.items;
		return (
			<div>
				{
					items && items.map((e)=> (
						<p>{e.name} - {e.price}!</p>
						)
					)
				}
			</div>
		);
	}
}
export default ProductsPanel;
