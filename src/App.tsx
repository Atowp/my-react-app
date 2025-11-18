import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/Home/Home";
import AboutPage from "./pages/About/About";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import TodoList from "./pages/TodoList/TodoList";
import FilterableProductTable from "./pages/FilterableProductTable/FilterableProductTable";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ticTacToe" element={<TicTacToe />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route
          path="/filterableProductTable"
          element={<FilterableProductTable />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
