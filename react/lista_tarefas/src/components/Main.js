import React, { Component } from 'react';

import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (!newTask) return;

    if (tasks.indexOf(newTask) !== -1) return; // Verifica se existem tarefas repetidas.

    const newTasks = [...tasks];

    if (index === -1) {
      // Se o indice for -1 é pq estou a criar uma tarefa, senão é pq estou a editar.
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: '', // Após a criação de cada tarefa, o input aparece em branco.
      });
    } else {
      newTasks[index] = newTask;

      this.setState({
        tasks: [...newTasks],
        index: -1,
        newTask: '',
      });
    }
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index],
    });
  };

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    this.setState({
      tasks: [...newTasks],
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
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className='edit'
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className='delete'
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
