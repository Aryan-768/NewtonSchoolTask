import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BlogPostDetail from './pages/blog-post-detail';
import Login from './pages/login';
import CreateEditPost from './pages/create-edit-post';
import UserDashboard from './pages/user-dashboard';
import UserProfileSettings from './pages/user-profile-settings';
import BlogPostList from './pages/blog-post-list';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Redirect root to login for authentication flow */}
        <Route path="/" element={<Login />} />
        <Route path="/blog-post-detail" element={<BlogPostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-edit-post" element={<CreateEditPost />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/blog-post-list" element={<BlogPostList />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;