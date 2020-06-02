import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export class OKStep extends React.PureComponent {
	render() {
		return (
			<div className={"okPanel"}>
				<div>
					<h1>OK</h1>
				</div>
				<div>
					<FontAwesomeIcon size={"10x"} color={"green"} className={"icon"} icon={faCheckCircle}/>
				</div>
			</div>
		);
	}
}

export default OKStep;
