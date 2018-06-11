import React from 'react';

const TaskBlock = props => 
	<div className={`task-block ${props.className || ''}`} onClick={props.handleClick}>
		<div className="wrapper">
			{props.children}
		</div>
	</div>;

export default TaskBlock;