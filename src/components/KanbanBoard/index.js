import React, { useState } from 'react';
import * as S from './styles';

function KanbanBoard() {
    const [tasks, setTasks] = useState([
      { id: 1, name: 'Task 1', status: 'todo', endDate: '' },
      { id: 2, name: 'Task 2', status: 'in progress', endDate: '' },
      { id: 3, name: 'Task 3', status: 'done', endDate: '' },
    ]);
  
    const [newTaskName, setNewTaskName] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
  
    function moveTask(id, newStatus) {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.id === id) {
            return { ...task, status: newStatus };
          }
          return task;
        })
      );
    }
  
    function addTask() {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          name: newTaskName,
          status: 'todo',
          endDate: newEndDate
        },
      ]);
      setNewTaskName('');
      setNewEndDate('');
    }
  
    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      }

      return (
        <S.Container>
          <h1>Kanban Board</h1>
          <div>
            <h2>Add Task</h2>
            <div>
              <input type="text" value={newTaskName} onChange={e => setNewTaskName(e.target.value)} />
              <button onClick={addTask}>Add</button>
            </div>
          </div>
          <div>
            <h2>To Do</h2>
            <div>
              {tasks
                .filter(task => task.status === 'todo')
                .map(task => (
                  <div key={task.id}>
                    <p>{task.name}</p>
                    <button onClick={() => moveTask(task.id, 'in progress')}>Start</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2>In Progress</h2>
            <div>
              {tasks
                .filter(task => task.status === 'in progress')
                .map(task => (
                  <div key={task.id}>
                    <p>{task.name}</p>
                    <button onClick={() => moveTask(task.id, 'done')}>Done</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2>Done</h2>
            <div>
              {tasks
                .filter(task => task.status === 'done')
                .map(task => (
                  <div key={task.id}>
                    <p>{task.name}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        </S.Container>
      );
}
export default KanbanBoard;