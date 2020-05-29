// Wein
//
// Bei uns gibt es immer 15 offene Weine, als kleines Glas, in der Karaffe oder als Flasche. Hier eine kleine Auswahl davon:
//
// 	Weißwein
//
// Grillo 'Lustru' IGP Cantine Europa, Sizilien
// 0,1 l 3,20 / 0,25 l 6,40 / 0,5 l 11,50 / 0,75 l 16,30
//
// Sauvignon ‘Matusin’ Walter Nardin, Veneto
// 0,1 l 3,80 / 0,25 l 7,60 / 0,5 l / 14,10 / 0,75 l 20,50
//
// Grauburgunder Weingut Braun, Pfalz
// 0,1 l 4,30 / 0,25 l 8,60 / 0,5 l 16,00 / 0,75 l 22,70
//
// Lugana Villa Trendi, Gardasee


import * as React from 'react';
import ProductSelection from "./ProductSelection";
import OrderSummary from "./OrderSummary";


import {wizardPages as pages} from "./OrderWizard"
import {NextButton} from "./NextButton";
import type {Product} from "../AppState";
import {BackButton} from "./BackButton";

type Props = {
	drinks: Array<Product>,
	selectedProducts: Array<Product>,
	selectedDrinks: Array<Product>,

}

//redundant
export class DrinksStep extends React.PureComponent<Props> {
	render() {
		return (
			<div className="wizardPanel">

				<h2 className={"wizardHeader"}>Maybe some drinks?</h2>

				<div className={"wizardMain"}>

					<BackButton page={pages.PRODUCT_LIST}/>

					<div className="wizardCenter">
						<ProductSelection productItems={this.props.drinks}/>
					</div>
					<div style={{textAlign: "right"}}>
						<NextButton label={"NEXT"} page={pages.ADDRESS}/>
						<OrderSummary selectedProducts={this.props.selectedProducts} selectedDrinks={this.props.selectedDrinks}/>
					</div>
				</div>
			</div>
		);
	}
}

export default DrinksStep;
