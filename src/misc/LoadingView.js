//@flow
import * as React from 'react';
import './loading.scss';

const LoadingView = () => {
	return (
		<div className="loading">
			<span className="loading__spinner" />
			Placing Order
		</div>
	);
};

export default LoadingView;
