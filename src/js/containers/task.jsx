import React from 'react';

import TaskBlock from '../components/taskBlock';

class Task extends React.Component {

	constructor () {
		super ();

		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
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

	handleChange (e) {
		this.setState({
			value: e.target.value
		})
	}
	handleClick () {
		this.props.onClick(this.props.id);
	}

	handleUpdate (e) {
		e.preventDefault();

		let type = e.target.getAttribute('data-id');

		this.props.onSave({
			id: this.props.id,
			name: this.state.value,
			status: this.getNextStatus(type)
		});
	}

	render () {
		let partial;

		if (this.props.isClicked) {
			partial = <div className="selected">
					{this.props.status == 'active' ?
						<a className="btn complete" data-id="complete" onClick={this.handleUpdate}>Complete</a> :
						<a className="btn undo" data-id="undo" onClick={this.handleUpdate}>Undo</a>}
					<a className="btn edit" data-id="edit" onClick={this.handleUpdate}>Edit</a>
				</div>;
		} else if (this.props.status == 'active' || this.props.status == 'complete') {
			partial = <div className="btn" onClick={this.handleClick} >
						<h3>{this.props.name}</h3>
						<span className={`status ${this.props.status}`}>{this.props.status}</span>
					</div>;
		} else {
			partial = <div className="form">
						<input type="text" placeholder="Enter task name ..." onChange={this.handleChange} value={this.state.value} />
						<a className="btn save" data-id="save" onClick={this.handleUpdate}>Save</a>
					</div>;
		}

		return <TaskBlock>{partial}</TaskBlock>;
	}
}

export default Task;
