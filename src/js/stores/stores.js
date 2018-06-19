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
	return { tasks: state.tasks.map( (item, i) =>
			(task.id == item.id) ? {
				id: task.id,
				name: task.name,
				status: task.status,
				isSelected: false
			} : item
		)}
}


const selectTask = (state, id) => {
	return {
		tasks: state.tasks.map( (item, i) =>
		(item.id == id) ? {...item, isSelected:true } : item
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
			return selectTask (state, action.id);
		default:
			return state;
	}
}

export default combineReducers({
  todo
});
