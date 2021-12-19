import React, { Component } from 'react';

import "./tabs.css"
import {DeliveryType} from "../AppState";
import { Button } from '@material-ui/core';



type Props = {
	children: Array<any>,
	activeTab: string
}

export function Tabs(props: Props) {

	const [activeTab, setActiveTab]  = React.useState(props.children[0].props.title);

	let onClickTabItem = (tab: string) => {
		setActiveTab( tab );
	}

	if (props.children) {
		return (
			<div className="tabs ">
				<Button variant="contained">Hello World</Button>
				<ol className="tab-list">
					{props.children.map((child) => {
						const { title } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={title}
								title={title}
								onClick={onClickTabItem}
							/>
						);
					})}
				</ol>
				<div className="tab-content">
					{props.children.map((child) => {
						if (child.props.title !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		);
	}else {
		return <span>nuttin here</span>
	}
}

type Props3 = {
	activeTab: string,
	title: string,
	onClick: (string) => any
}

function Tab(props: Props3)  {

	// let onClickX = () => {
	// 	// const { title, onClick } = props;
	// 	onClick(props.title);
	// }

	// const {
	// 	onClickX,
	// 	props: {
	// 		activeTab,
	// 		title,
	// 	},
	// } = this;

	let className = 'tab-list-item';

	if (props.activeTab === props.title) {
		className += ' tab-list-active';
	}

	return (
		<li
			className={className}
			onClick={props.onClick}
		>
			{props.title}
		</li>
	);
}



type Props2 = {
	onClick : any;
	title : any;
	activeTab: any;
}

type State2 = {

}

class TabXX extends Component<Props2, State2>  {

	onClick = () => {
		const { title, onClick } = this.props;
		onClick(title);
	}

	render() {
		const {
			onClick,
			props: {
				activeTab,
				title,
			},
		} = this;

		let className = 'tab-list-item';

		if (activeTab === title) {
			className += ' tab-list-active';
		}

		return (
			<li
				className={className}
				onClick={onClick}
			>
				{title}
			</li>
		);
	}
}

export default Tab;