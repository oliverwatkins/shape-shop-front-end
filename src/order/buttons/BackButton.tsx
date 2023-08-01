import * as React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";

import "./Buttons.scss"

type Props = {
	page: string
}

export function BackButton(props: Props) {
	return (
		<Link to={props.page}>
			<button className={"backButton next-prev-button wiz-item"}>
				<FontAwesomeIcon icon={faArrowCircleLeft} className={"icon"}/>
			</button>
		</Link>
	);
}
