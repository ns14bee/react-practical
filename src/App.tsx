import React, { Suspense, lazy } from "react";
import "./App.css";
import { Layout } from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/organism/dashboard";

import { RouteEnum } from "./utils/enums";
import { ThemeProvider } from "./context/ThemeProvider";
import { TodoProvider } from "./context/TodoProvider";
import { StudentProvider } from "./context/StudentProvider";

const Students = lazy(() => import("./components/organism/students"));
const Theme = lazy(() => import("./components/organism/theme"));
const Todo = lazy(() => import("./components/organism/todo"));

const App = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <StudentProvider>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path={RouteEnum.Dashboard} element={<Dashboard />} />
                <Route path={RouteEnum.Theme} element={<Theme />} />
                <Route path={RouteEnum.Todo} element={<Todo />} />
                <Route path={RouteEnum.Student} element={<Students />} />
              </Routes>
            </Suspense>
          </Layout>
        </StudentProvider>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
