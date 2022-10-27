import * as React from 'react';
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";

import "./Buttons.scss"

type Props = {
	label: string,
	page?: string,
	type?: "button" | "submit" | "reset" | undefined, //submit?
	form?: string, //form id
	disabled: boolean
}

/**
 * This may be part of a form (hence 'form' attribute), or a link
 */
export function NextButton(props: Props) {

	const { push } = useHistory()

	if (!props.page) {

		//the redirect happens in the onSubmit, not here
		return (
			<button disabled={props.disabled} className={"nextButton next-prev-button"} type={props.type} form={props.form}>
				Form button
				<div style={{display: "flex"}}>
					<div className={"label"}>
						{props.label}
					</div>
					<div>
						<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight}/>
					</div>
				</div>
			</button>
		)
	} else {
		return (
			<button disabled={props.disabled} className={"nextButton next-prev-button"} type={props.type} form={props.form} onClick={() => push('' + props.page)}>
				<div style={{display: "flex"}}>
					<div className={"label"}>
						{props.label}
					</div>
					<div>
						<FontAwesomeIcon className={"icon"} icon={faArrowCircleRight}/>
					</div>
				</div>
			</button>
		)
	}
}
