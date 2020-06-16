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
			<div>
				<FontAwesomeIcon className={"icon testtest"} icon={faArrowCircleRight}/>
			</div>
		)
	} else {
		return (
			<Link to={props.page}>
				<button className={"nextButton next-prev-button"} type={props.type} form={props.form}>
					<div style={{display: "flex"}}>
						<div className={"label"}>
							{props.label}
						</div>
						<div>
							<FontAwesomeIcon className={"icon testtest"} icon={faArrowCircleRight}/>
						</div>
					</div>
				</button>
			</Link>)
	}


	// <Link className={"testtest"} to={"/admin"}>
	// 	<button className={"nextButton next-prev-button testXtest"}>
	// 					<div>
	// 						click me!
	// 					</div>
	// 	</button>
	// </Link>


}


export function NextButton_OLD(props: Props) {
	return (


		// <Link className={"testtest"} to={"/admin"}>
		// 	<button className={"nextButton next-prev-button testXtest"}>
		// 					<div>
		// 						click me!
		// 					</div>
		// 	</button>
		// </Link>

		<button className={"nextButton next-prev-button"} type={props.type} form={props.form}>
			<div style={{display: "flex"}}>
				<div className={"label"}>
					{props.label}
				</div>
				{props.page &&
				<Link to={props.page}>
					<div>
						<FontAwesomeIcon className={"icon testtest"} icon={faArrowCircleRight}/>
					</div>
				</Link>
				}
				{!props.page &&
				<div>
					<FontAwesomeIcon className={"icon testtest"} icon={faArrowCircleRight}/>
				</div>
				}
			</div>
		</button>
	);
}
