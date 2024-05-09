import React, { Component } from 'react';
import Tarefas from './Tarefas';
import Form from './Form';

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
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />
        <Tarefas
          tasks={tasks}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}
