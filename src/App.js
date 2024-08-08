import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<NotesPage />} />
        <Route path='/note/:id' element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
