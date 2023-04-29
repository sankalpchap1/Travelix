import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import Form from './Form';
import NewUserMainPage from './NewUserMainPage';

function App() {
  return (
    <>
    <Router>
       <Routes> 
          <Route path="/" element={<MainPage/>} />
          <Route path="/form" element={<Form/>} />
          <Route path="/new-user" element={<NewUserMainPage/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;