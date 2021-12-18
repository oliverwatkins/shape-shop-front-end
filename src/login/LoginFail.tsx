import React from 'react';

type Props = {
	errorMessage: string;
}

export function LoginFail(props: Props) {
	let msg = props.errorMessage;

	return (
		<div className="loginFail">
			Login Fail :(
			<br />
			{msg}
		</div>
	)
}
