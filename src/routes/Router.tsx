import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { TableEditor } from "./TableEditor/TableEditor";

const SignInPage = lazy(() => import("./SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./SignUpPage/SignUpPage"));
const LandingPage = lazy(() => import("./LandingPage/LandingPage"));
const Public = lazy(() => import("./Public/Public"));
const Protected = lazy(() => import("./Protected/Protected"));
const Google = lazy(() => import("./Google/Google"));

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={null}>
              <LandingPage />
            </Suspense>
          }
          path={paths.root}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <SignInPage />
            </Suspense>
          }
          path={paths.signIn}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <SignUpPage />
            </Suspense>
          }
          path={paths.signUp}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <Public />
            </Suspense>
          }
          path={paths.public}
        />

        <Route
          element={
            <Suspense fallback={null}>
              <Google />
            </Suspense>
          }
          path={paths.googleAuth}
        />

        <Route
          element={
            <Suspense fallback={null}>
              <Protected />
            </Suspense>
          }
          path={paths.root}
        >
          <Route element={<Dashboard />} path={paths.dashboard} />
          <Route element={<TableEditor />} path={paths.tableTemplate} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
