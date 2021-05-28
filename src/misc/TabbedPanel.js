import React, { Component } from 'react';

import "./tabs.scss"

export class Tabs extends Component {

	constructor(props) {
		super(props);
		if (this.props.children) {
			this.state = {
				activeTab: this.props.children[0].props.label,
			};
		}
	}

	onClickTabItem = (tab) => {
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


class Tab extends Component {
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