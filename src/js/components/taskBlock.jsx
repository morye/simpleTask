import React from 'react';

const TaskBlock = props =>
	<div className={`task-block ${props.className || ''}`}>
		<div className="wrapper">
			{props.children}
		</div>
	</div>;

export default TaskBlock;
