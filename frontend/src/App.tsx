import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Collections from "./pages/Collections";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JumpTop from "./components/JumpTop";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Collections />} />
          <Route path="/tasks/:collection_id" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer autoClose={5000} />
      <JumpTop />
    </BrowserRouter>
  );
};

export default App;
