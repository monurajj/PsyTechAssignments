import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockDetails from './components/StockDetails';
import NavBar from './components/navbar';
import SignIn from './Authentication/signIn';
import SignUp from './Authentication/signUp';
import HomePage from './components/homepage';
import AboutUs from './components/aboutUs';
import PsytechChatbot from './ChatSupport/chatsupport';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<StockDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ChatSupport" element={<PsytechChatbot />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
