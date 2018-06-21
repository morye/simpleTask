import types from './types';

export function addTask () {
	return { type: types.ADDTASK };
}

export function removeTask (id) {
	return { type: types.REMOVETASK, id:id };
}

export function saveTask (task) {
	return { type: types.SAVETASK, task:task };
}

export function selectTask (id) {
	return { type: types.SELECTTASK, id:id };
}
