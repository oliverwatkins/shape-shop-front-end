import * as React from 'react';

import welcome from './assets/img/welcome.jpg';
import "./home.scss"

export default function Home (props: any) {

	{/*//TODO put first cat name in here*/}
	// let categories = useSelector(selectCategories);
	let firstCat = "squares";


	return (
		<div className={"home"}>

			<div className={"continue-button-panel"}>

				{/*<Link to={"/order/cat_" + firstCat} >Order</Link>*/}


				<a href={"/order/cat_" + firstCat} className="rounded-button">
						Enter Shop..
				</a>
			</div>

			{/*<img id={"welcome"} src={welcome}  />*/}
		</div>
	)
}

