import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import PostDetail from "../pages/PostDetail";
import EditPost from "../pages/EditPost";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes under the main App shell */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="new" element={<NewPost />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  );
}
