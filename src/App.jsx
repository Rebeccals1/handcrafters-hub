import Navbar from "./components/layout/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthSession from "./hooks/useAuthSession";
import "react-toastify/dist/ReactToastify.css";
import './styles/app.css'
import Footer from './components/layout/Footer'

export default function App() {
  const { user } = useAuthSession();

  return (
    <>
      <Navbar user={user} />
      <main className="container">
        <Outlet context={{ userId: user?.id }} />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
