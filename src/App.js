import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./Pages/About";
import Home from "./Pages/Home";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/alert/AlertContext";


function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />

            <main className="container mx-auto px-3 pb-12">
              <Routes>
                <Route
                  path='/'
                  element={
                    <>
                      <Alert />
                      <Home />
                    </>
                    }
                />
                <Route path="/about" element= {<About/>}/>
                <Route path="/user/:login" element= {<User/>}/>
                <Route path="/notfound" element= {<NotFound/>} />
                <Route path="*" element= {<NotFound/>} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AlertProvider> 
    </GithubProvider>
  );
}

export default App;
