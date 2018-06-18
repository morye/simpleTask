import React from 'react';
import {connect} from "react-redux";

import { removeTask, saveTask, selectTask } from '../actions/index';
import TaskBlock from '../components/taskBlock';

class Task extends React.Component {

	constructor (props) {
		super (props);

		this.state = {
			value: '',
			selected: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
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

	handleSelect () {
		this.setState({
			selected: true
		});
	}

	handleUpdate (e) {
		e.preventDefault();
		//e.stopPropagation();

		let type = e.target.getAttribute('data-id');

		this.setState({
			selected: false
		});
		this.props.saveTask({
			id: this.props.id,
			name: this.state.value,
			status: this.getNextStatus(type)
		});
	}

	render () {
		let partial;
		let status = this.props.details.status;

		if (this.state.selected) {
			partial = <div className="selected">
					{this.props.details.status == 'active' ?
						<a className="btn complete" data-id="complete" onClick={this.handleUpdate}>Complete</a> :
						<a className="btn undo" data-id="undo" onClick={this.handleUpdate}>Undo</a>}
					<a className="btn edit" data-id="edit" onClick={this.handleUpdate}>Edit</a>
				</div>;
		} else if (status == 'active' || status == 'complete') {
			partial = <div className="btn" onClick={this.handleSelect} >
						<h3>{this.props.details.name}</h3>
						<span className={`status ${this.props.details.status}`}>{this.props.details.status}</span>
					</div>;
		} else {
			partial = <div className="form">
						<input type="text" placeholder="Enter task name ..." onChange={this.handleChange} value={this.state.value} />
						<a className="btn save" data-id="save" onClick={this.handleUpdate}>Save</a>
					</div>;
		}

		return <TaskBlock>
					{partial}
				</TaskBlock>;
	}
}

Task.defaultValue = {
	details: {}
};

let mapStateToProps = state => ({});

let mapActionsToProps = dispatch =>({
	removeTask () {
		return dispatch (removeTask());
	},
	saveTask (task) {
		return dispatch (saveTask(task));
	}
});

export default connect(mapStateToProps, mapActionsToProps)(Task);
