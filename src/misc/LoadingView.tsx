import * as React from 'react';
import './loading.scss';

export const LoadingView = (props: {msg:string, desc:string}) => {
	return (
		<div className="loading loading__spinner_container">
			<span className="loading__spinner" />
			<div className="loading__spinner_text" >{props.msg}</div>
			<div className="loading__spinner_subtext" >{props.desc}</div>
		</div>
	);
}