import React, { Component } from 'react';

import "./tabs.scss"



type Props = {
	children: Array<any>,
	activeTab: string
}
type State = {
	activeTab: any;
}
export class Tabs extends React.PureComponent<Props, State>  {

	constructor(props: any) {
		super(props);
		if (this.props.children) {
			this.state = {
				activeTab: this.props.children[0].props.label,
			};
		}
	}

	onClickTabItem = (tab: any) => {
		this.setState({ activeTab: tab });
	}

	render() {
		const {
			onClickTabItem,
			props: {
				children,
			},
			state: {
				activeTab,
			}
		} = this;

		return (
			<div className="tabs ">
				<ol className="tab-list">
					{children.map((child) => {
						const { label } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTabItem}
							/>
						);
					})}
				</ol>
				<div className="tab-content">
					{children.map((child) => {
						if (child.props.label !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		);
	}
}


type Props2 = {
	onClick : any;
	label : any;
	activeTab: any;
}

type State2 = {

}

class Tab extends Component<Props2, State2>  {
	// static propTypes = {
	// 	activeTab: PropTypes.string.isRequired,
	// 	label: PropTypes.string.isRequired,
	// 	onClick: PropTypes.func.isRequired,
	// };

	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	}

	render() {
		const {
			onClick,
			props: {
				activeTab,
				label,
			},
		} = this;

		let className = 'tab-list-item';

		if (activeTab === label) {
			className += ' tab-list-active';
		}

		return (
			<li
				className={className}
				onClick={onClick}
			>
				{label}
			</li>
		);
	}
}

export default Tab;