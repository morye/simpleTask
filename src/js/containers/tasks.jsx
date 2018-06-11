import React from 'react';
import {connect} from "react-redux";

import { addTask } from '../actions/index';
import TaskBlock from '../components/taskBlock';
import Task from './task';

const TaskStatus = props => <TaskBlock className={`container-complete ${props.className}`}>{props.children}</TaskBlock>

const TaskList = props => <div className="task-list">{props.children}</div>;

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			tasks: [],
			activeCount: 0
		};
	}
	
	componentWillReceiveProps (nextProps) {
		let newTasks = [];
		let activeCount = 0;
		for (let x=0; x<nextProps.tasks.length; x++) {
			newTasks.push({...nextProps.tasks[x]});
			activeCount = nextProps.tasks[x].status == 'active' ? activeCount + 1 : activeCount;
		}
		this.setState({
			tasks: newTasks,
			activeCount: activeCount
		});
	}
	
	render() {
		return <div className="tasks-container">
					<h2>Your tasks</h2>
					<TaskStatus className={this.state.activeCount == 0 ? 'completed' : ''}>
						<h3>{this.state.activeCount > 0 ? 'Complete all tasks' : 'All tasks completed'}</h3>
						<span className="status">
							{this.state.activeCount > 0 ? `You have ${this.state.activeCount} active tasks` : 'Well done!'}
						</span>
					</TaskStatus>
					<TaskList>
						{this.state.tasks.map( (task, i) => <Task key={i} id={task.id} details={task} /> )}
						<TaskBlock className="container-add" handleClick={this.props.addNewTask}>
							+ Add Task
						</TaskBlock>
					</TaskList>
				</div>;
	}
}

let mapStateToProps = state => {
	return {
		tasks: state.todo.tasks
	}
};

let mapActionsToProps = dispatch =>({
	addNewTask () {
		return dispatch (addTask());
	}
});

export default connect(mapStateToProps, mapActionsToProps)(Tasks);