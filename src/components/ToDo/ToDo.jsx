import TaskCreater from './TaskCreater';
import TaskList from './TaskList/TaskList';
import TaskWrapper from './TaskList/TaskWrapper';
import Task from './TaskList/Task/Task';
import styles from './index.module.scss';
import useTodo from '../../hooks/useToDo';
import { useState } from 'react';

const ToDo = () => {
  const { createTask, deleteTask, updateTask, state } = useTodo();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectedTask = selectedTaskId && state.entities.find(({ id }) => id === selectedTaskId);

  return (
    <main className={styles.main}>
      <h1>To Do App</h1>
      <div className={styles.box}>
        <section className={styles.box}>
          <TaskCreater createTask={createTask} />
        </section>
        <TaskList
          tasks={state.entities}
          tasksLoading={state.loading}
          setSeletedTaskId={setSelectedTaskId}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
      {selectedTaskId && selectedTask && (
        <TaskWrapper onCloseClick={() => setSelectedTaskId(null)}>
          <Task task={selectedTask} updateTask={updateTask} />
        </TaskWrapper>
      )}
    </main>
  );
};

export default ToDo;
