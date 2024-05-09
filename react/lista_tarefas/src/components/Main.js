import React, { Component } from 'react';

import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1) return; // Verifica se existem tarefas repetidas.

    const newTasks = [...tasks];

    this.setState({
      tasks: [...newTasks, newTask],
    });
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className='main'>
        <h1>Lista de tarefas</h1>

        <form onSubmit={this.handleSubmit} action='#' className='form'>
          <input onChange={this.handleChange} type='text' value={newTask} />
          <button type='submit'>
            <FaPlus />
          </button>
        </form>
        <ul className='tasks'>
          {tasks.map((task) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit className='edit' />
                <FaWindowClose className='delete' />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
