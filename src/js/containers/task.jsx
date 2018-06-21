import React from 'react';

import TaskBlock from '../components/taskBlock';

const TaskSelected = props =>
<div className="taskSelected">
	<button className={props.type} data-id={props.type} onClick={props.handleUpdate}>{props.type}</button>
	<button className="edit" data-id="edit" onClick={props.handleUpdate}>Edit</button>
</div>;

const TaskSet = props =>
<div className="taskSet" onClick={props.handleClick}>
	<h3>{props.name}</h3>
	<span className={`status ${props.status}`}>{props.status}</span>
</div>;

class Task extends React.PureComponent {

	constructor () {
		super ();

		this.handleAdd = this.handleAdd.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	getNextStatus (type) {
		switch (type) {
			case 'complete':
				return 'complete';
			case 'undo':
				return 'active';
			case 'edit':
				return 'edit';
			default:
				return 'active';
		}
	}
	handleClick () {
		this.props.onClick(this.props.id);
	}

	handleAdd (e) {
		e.preventDefault();
		if (this._input.value != '') {
			let type = e.target.getAttribute('data-id');
			this.props.onSave({
				id: this.props.id,
				name: this._input.value,
				status: this.getNextStatus(type)
			});
			this._input.value = '';
		}
	}

	handleUpdate (e) {
		e.preventDefault();
		let type = e.target.getAttribute('data-id');
		this.props.onSave({
			id: this.props.id,
			name: this.props.name,
			status: this.getNextStatus(type)
		});
	}

	render () {
		let partial;
		let isStatusSet = this.props.status == 'active' || this.props.status == 'complete';

		if (this.props.isClicked) {
			partial = <TaskSelected type={this.props.status == 'active' ? 'complete' : 'undo'} handleUpdate={this.handleUpdate} />
		} else if (isStatusSet) {
			partial = <TaskSet name={this.props.name} status={this.props.status} handleClick={this.handleClick} />
		} else {
			partial = <form className="form" onSubmit={this.handleAdd}>
				<input
					ref={node => {
						this._input = node
					}}
					type="text"
					placeholder="Enter task name ..."
					defaultValue={this.props.name}
					/>
				<button className="save" type="submit" data-id="save">Save</button>
			</form>;
		}

		return <TaskBlock>
			<a className="remove" title="Remove" onClick={(e) => {
				e.preventDefault();
				this.props.onRemove(this.props.id)
			}}>X</a>
			{partial}
			</TaskBlock>;
	}
}

export default Task;
