import React from 'react';
import Tasks from './tasks';

const _user_info = {
	id: "Morye"
};

const Header = props => <header>{props.children}</header>;

const App = () => (
	<div id="main">
		<Header>
			<h1>SimpleTask</h1>
			<div className="userId">
				{`Hello, ${_user_info.id}`}
			</div>
		</Header>
		<Tasks />
	</div>
);
		
export default App