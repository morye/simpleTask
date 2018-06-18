// import * as _ from "lodash";
import { combineReducers } from 'redux';
import types from '../actions/types';

let taskId = 0;

const addTask = (state, task) => {
	return { tasks: [...state.tasks, {
		id: taskId ++,
		name: task.name,
		status: 'edit'
	}] };
};

const saveTask = (state, task) => {
	return { tasks: state.tasks.map( (_task, i) =>
			(task.id == _task.id) ? {
				id: task.id,
				name: task.name,
				status: task.status,
				isSelected: false
			} : _task
		)}
}


const selectTask = (state, id) => {
	return {
		tasks: state.tasks.map( (task, i) =>
		(task.id == id) ? {...task, isSelected:true } : task
	)}
};

function todo (state = {
	tasks: []
}, action) {
	switch (action.type) {
		case types.ADDTASK:
			return addTask (state, {});
		case types.SAVETASK:
			return saveTask (state, action.task);
		case types.SELECTTASK:
			return selectTask (state, action.task);
		default:
			return state;
	}
}

export default combineReducers({
  todo
});
