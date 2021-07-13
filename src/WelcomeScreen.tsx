import * as React from 'react';
import {connect} from "react-redux";

import welcome from './assets/img_DEPRECATED/welcome.jpg';



export default function Overview (props: any) {
	return (
		<div>
			<img style={{width:"100%"}} src={welcome} alt="Welcome" />
		</div>
	)
}

