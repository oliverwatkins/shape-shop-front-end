import * as React from 'react';


export class Footer extends React.PureComponent {
	render() {
		return (
			<div className="container">
				<div className="footer">
					<p>
						<span className="">Copyright © 2019 Higgins Ale Works - All Rights Reserved.</span>
					</p>
					<p>
						<span className="">
							<a className="" href="mailto:mail@higginsaleworks.com" target="_blank">mail@higginsaleworks.com</a>
						</span>
					</p>
					<p>
						<span className=" ">&nbsp;&nbsp;+491728462474 &nbsp;&nbsp;</span>
					</p>
				</div>
			</div>
		);
	}
}

export default Footer;