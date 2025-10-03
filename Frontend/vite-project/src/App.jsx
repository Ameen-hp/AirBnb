import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from "./pages/Home"
import HomeList from "./pages/HomeList";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import HostHomes from "./pages/HostHomes";
import AddHome from "./pages/AddHome";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeDetails from "./pages/HomeDetails";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (


    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
       <Header user={user} setUser={setUser} />

        {/* Main Content */}
        <main className="flex-grow p-6">
          <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route path="/homeList" element={<HomeList />} />
            <Route path="/about" element={<About />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/hostHomes" element={<HostHomes />} />
            <Route path="/addHome" element={<AddHome />} />
            <Route  path="homes/:homeId" element={<HomeDetails/>}/>
             <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm onLogin={setUser} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
