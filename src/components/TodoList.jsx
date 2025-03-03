// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [todoText, setTodoText] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      storedTodos.forEach(todo => dispatch({ type: 'ADD_TODO', payload: todo }));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), text: todoText } });
      setTodoText('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleUpdateTodo = (id) => {
    const updatedText = prompt("Update todo text:");
    if (updatedText) {
      dispatch({ type: 'UPDATE_TODO', payload: { id, text: updatedText } });
    }
  };

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
      />
      <TextField
        label="New Todo"
        variant="outlined"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>Add Todo</Button>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <Button onClick={() => handleUpdateTodo(todo.id)}>Edit</Button>
              <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
