import React from 'react';
import {connect} from "react-redux";

import { addTask, saveTask, selectTask } from '../actions/index';
import TaskBlock from '../components/taskBlock';
import Task from './task';

const TaskStatus = props => <TaskBlock className={`container-complete ${props.className}`}>{props.children}</TaskBlock>

const TaskList = props => <div className="task-list">{props.children}</div>;

const Tasks = props => {
	let activeCount = 0;
	props.tasks.forEach(task => {
		if (task.status == 'active')
			activeCount ++;
	});

	return <div className="tasks-container">
				<h2>Your tasks</h2>
				<TaskStatus className={activeCount == 0 ? 'completed' : ''}>
					<h3>{activeCount > 0 ? 'Complete all tasks' : 'All tasks completed'}</h3>
					<span className="status">
						{activeCount > 0 ? `You have ${activeCount} active tasks` : 'Well done!'}
					</span>
				</TaskStatus>
				<TaskList>
					{props.tasks.map( (task, i) =>
						<Task
							key={i}
							id={task.id}
							name={task.name}
							status={task.status}
							isClicked={task.isSelected}
							onClick={props.selectTask}
							onSave={props.saveTask}
						/> )
					}
					<TaskBlock className="container-add" handleClick={props.addNewTask}>
						+ Add Task
					</TaskBlock>
				</TaskList>
			</div>;
}

let mapStateToProps = state => {
	return {
		tasks: state.todo.tasks
	}
};

let mapActionsToProps = dispatch =>({
	addNewTask () {
		return dispatch (addTask());
	},
	saveTask (task) {
		return dispatch (saveTask(task));
	},
	selectTask (id) {
		return dispatch (selectTask(id));
	}
});

export default connect(mapStateToProps, mapActionsToProps)(Tasks);
