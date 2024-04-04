import React from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = React.useState<string>('');

  const onAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(), // Not a great way to generate IDs
        title: taskName,
        isCompleted: false,
      },
    ]);
    //after pressing 'Add' the Add Task input area should clear
    setTaskName('');
  };

  const onEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskTitle(task.title);
  };

  const onSaveEditedTask = () => {
    setTasks(
      tasks.map((task) => {
        if (task.id === editingTaskId) {
          return { ...task, title: editedTaskTitle };
        }
        return task;
      }),
    );
    setEditingTaskId(null);
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter((keepTask) => keepTask.id !== task.id));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add Task: </label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={onAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <label htmlFor="editing-task">Edit Task: </label>
                <input
                  id="editing-task"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <button onClick={onSaveEditedTask}>Save</button>
              </>
            ) : (
              <>
                <li>{task.title}</li>
                <button onClick={() => onEditTask(task)}>Edit {task.id}</button>
              </>
            )}
            <button onClick={() => deleteTask(task)}>Delete {task.id}</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
