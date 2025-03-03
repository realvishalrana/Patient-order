import React from "react";
import PatientOrder from "./components/PatientOrder";
import Temp from "./components/temp";
import { Container } from '@mui/material';
import TodoList from "./components/TodoList";


function App() {
  return (
    <>
     <Container>
      <h1>Todo List</h1>
      <TodoList />
    </Container>
      {/* <Temp /> */}
      {/* <PatientOrder /> */}
    </>
  );
}

export default App;
