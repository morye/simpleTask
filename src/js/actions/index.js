import types from './types';

export function addTask () {
	return { type: types.ADDTASK };
}

export function removeTask () {
	return { type: types.REMOVETASK };
}

export function saveTask (task) {
	return { type: types.SAVETASK, task:task };
}

export function selectTask (task) {
	return { type: types.SELECTTASK, task:task };
}
