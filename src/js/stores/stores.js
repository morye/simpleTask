// import * as _ from "lodash";
import { combineReducers } from 'redux';
import types from '../actions/types';

let taskId = 0;

const addTask = (state, task) => {
	let _state = state;

	return { tasks: [..._state.tasks, {
		id: taskId ++,
		name: task.name,
		status: 'edit'
	}] };
};

const saveTask = (state, task) => {
	let activeCount = 0;
	let updatedTasks = state.tasks.map( (_task, i) => {
			if (task.status == 'active') {
				activeCount ++
			}
			if (task.id == _task.id) {
				return {
					id: task.id,
					name: task.name,
					status: task.status
				}
			} else {
				return _task;
			}
		});
	return { tasks: updatedTasks, activeCount:activeCount };
};

function todo (state = {
	tasks: []
}, action) {
	switch (action.type) {
		case types.ADDTASK:
			return addTask (state, {});
		case types.SAVETASK:
			return saveTask (state, action.task);
		default:
			return state;
	}
}

export default combineReducers({
  todo
});
