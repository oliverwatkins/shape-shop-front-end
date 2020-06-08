import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
	const tree = renderer
		.create(<div page="http://www.facebook.com">Facebook2</div>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});