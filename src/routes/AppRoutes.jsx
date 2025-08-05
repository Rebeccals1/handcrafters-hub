import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import PostDetail from "../pages/PostDetail";
import EditPost from "../pages/EditPost";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage"; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes (require login) */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="new" element={<NewPost />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  );
}
