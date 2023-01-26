import * as React from 'react';
import ProductSelection from "../ProductSelection";
import OrderSummary from "../OrderSummary";
import {NextButton} from "../buttons/NextButton";
import type {Category, Product} from "../../AppState";
import {BackButton} from "../buttons/BackButton";

import "./productStep.scss";
import Header from "./Header";



type Props = {
	categoryProducts: { [category: string]: Array<Product> },
	category: Category,
	categories: Array<Category>,
	selectedProducts?: Array<Product>,
	nextURL: string
}

function ProductStep(props: Props) {

	if (!props.category)
		throw "no category"

	return (
		<div className={"wiz-container"}>
			{/*TODO figure out how to use empty space with CSS Grid (and get rid of this) :*/}
			<div className={"emptySpace"}/>
			<Header text={props.category.name}/>
			<BackButton page={getPrevPageURL(props)}/>
			<ProductSelection productItems={props.categoryProducts[props.category.name]} />
			<NextButton label={"next"} page={getNextPageURL(props)} disabled={false}/>
			<OrderSummary/>
		</div>
	);
}

//TODO refactor these f's ?
function getPrevPageURL(props: Props) {
	let c = getPrevCategory(props.category, props.categories)
	if (c)
		return "/order/cat_" + c.name;
	else
		return "/";
}

function getNextPageURL(props: Props) {
	let c = getNextCageory(props.category, props.categories)
	if (c)
		return "/order/cat_" + c.name;
	else
		return props.nextURL;
}

function getNextCageory(category: Category, categories: Array<Category>): Category | undefined {
	let c = categories.find(element => element.name === category.name)
	if (c) {
		let i = categories.indexOf(c);

		if (i + 1 >= categories.length) {
			return undefined
		}
		return categories[i + 1];
	}else {
		throw "no category here"
	}
}


function getPrevCategory(category: Category, categories: Array<Category>): Category | undefined {
	let c = categories.find(element => element.name === category.name)
	if (c) {
		let i = categories.indexOf(c);

		if (i === 0)
			return undefined
		return categories[i - 1];
	}else {
		throw "no category here"
	}
}

export default ProductStep;
