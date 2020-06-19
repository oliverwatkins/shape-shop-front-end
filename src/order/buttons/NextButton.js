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

/**
 * This may be part of a form (hence 'form' attribute), or a link
 */
export function NextButton(props: Props) {

	if (!props.page) {
		return (
			<button className={"nextButton next-prev-button"} type={props.type} form={props.form}>
				<div>
					<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight}/>
				</div>
			</button>
		)
	} else {
		return (
			<Link to={props.page}  style={{ textDecoration: 'none' }}>
				<button className={"nextButton next-prev-button"} type={props.type} form={props.form}>
					<div style={{display: "flex"}}>
						<div className={"label"}>
							{props.label}
						</div>
						<div>
							<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight}/>
						</div>
					</div>
				</button>
			</Link>)
	}
}
