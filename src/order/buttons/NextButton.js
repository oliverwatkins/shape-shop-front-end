import * as React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";

type Props = {
	label: "string",
	page?: "string",
	type?: "string", //submit?
	form?: "string" //form id
}

export function NextButton(props: Props) {
	return (
		<button className={"nextButton next-prev-button"} type={props.type} form={props.form}>
			<div style={{display: "flex"}}>
				<div className={"label"}>
					{props.label}
				</div>
				{props.page &&
				<Link to={props.page}>
					<div>
						<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight} />
					</div>
				</Link>
				}
				{!props.page &&
					<div>
						<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight}/>
					</div>
				}
			</div>
		</button>
	);
}
