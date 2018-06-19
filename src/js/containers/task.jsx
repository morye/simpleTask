import React from 'react';

import TaskBlock from '../components/taskBlock';

const TaskSelected = props => <div className="selected">
																<button className={props.type} data-id={props.type} onClick={props.handleUpdate}>{props.type}</button>
																<button className="edit" data-id="edit" onClick={props.handleUpdate}>Edit</button>
															</div>;

const TaskSet = props => <div onClick={props.handleClick} >
														<h3>{props.name}</h3>
														<span className={`status ${props.status}`}>{props.status}</span>
													</div>;

class Task extends React.PureComponent {

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
		let isStatusSet = this.props.status == 'active' || this.props.status == 'complete';

		if (this.props.isClicked) {
			partial = <TaskSelected type={this.props.status == 'active' ? 'complete' : 'undo'} handleUpdate={this.handleUpdate} />
		} else if (isStatusSet) {
			partial = <TaskSet name={this.props.name} status={this.props.status} handleClick={this.handleClick} />
		} else {
			partial = <form className="form" onSubmit={this.handleUpdate}>
									<input type="text" placeholder="Enter task name ..." onChange={this.handleChange} value={this.state.value} />
									<button className="save" type="submit" data-id="save">Save</button>
								</form>;
		}

		return <TaskBlock>{partial}</TaskBlock>;
	}
}

export default Task;
