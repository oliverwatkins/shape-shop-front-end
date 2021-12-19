//@flow
import * as React from 'react';
import './loading.css';

export const LoadingView = (props: any) => {
	return (
		<div className="loading">
			<span className="loading__spinner" />
			TODO
		</div>
	);
};




export const LoadingView2 = (props: any) => {
	if (props.children && props.active)
		return (
			<div className="loading2">
				<span className="loading__spinner2" />
				{props.children}
			</div>
		);
	else
		return props.children
};