import * as React from 'react';

import welcome from './assets/img/welcome.jpg';

export default function Overview (props: any) {
	return (
		<div>
			<img style={{width:"100%"}} src={welcome} alt="Welcome" />
		</div>
	)
}

