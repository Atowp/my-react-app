import { useState } from "react";

let nextId = 0;
const initialTodos = [
  { id: 0, title: "Buy milk", completed: true },
  { id: 1, title: "Eat tacos", completed: false },
  { id: 2, title: "Brew tea", completed: false },
];
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function AddTodo({ onAddTodo }: { onAddTodo: (title: string) => void }) {
  const [title, setTitle] = useState("");
  return (
    <>
      <input
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="ml-2"
        onClick={() => {
          setTitle("");
          onAddTodo(title);
        }}
      >
        Add
      </button>
    </>
  );
}

function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo,
}: {
  todos: Todo[];
  onChangeTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}) {
  return (
    <>
      <ul className="list-none p-0">
        {todos.map(
          (todo: { id: number; title: string; completed: boolean }) => (
            <li key={todo.id} className="mb-2">
              <Task
                todo={todo}
                onChange={onChangeTodo}
                onDelete={onDeleteTodo}
              />
            </li>
          )
        )}
      </ul>
    </>
  );
}

function Task({
  todo,
  onChange,
  onDelete,
}: {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button className="mr-2 ml-2" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button className="mr-2 ml-2" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          onChange({
            ...todo,
            completed: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title: string) {
    nextId = initialTodos.length;
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        completed: false,
      },
    ]);
  }
  function handleChangeTodo(nextTodo: {
    id: number;
    title: string;
    completed: boolean;
  }) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === nextTodo.id) {
          return nextTodo;
        } else {
          return todo;
        }
      })
    );
  }
  function handleDeleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}

export default TodoList;
