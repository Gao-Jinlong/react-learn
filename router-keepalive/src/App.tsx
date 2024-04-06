import { useState } from "react";
import "./App.css";
import {
  useLocation,
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import KeepAliveLayout, { useKeepOutlet } from "./KeepAlive";

const Layout = () => {
  const { pathname } = useLocation();
  const element = useKeepOutlet();

  return (
    <div>
      <div>当前路由:{pathname}</div>
      {element}
    </div>
  );
};

const Aaa = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>{count}</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count++
          </button>
        </p>
        <div>
          <Link to="/bbb">bbb</Link>
        </div>
        <div>
          <Link to="/ccc">ccc</Link>
        </div>
      </div>
    </>
  );
};

const Bbb = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={() => setCount((count) => count + 1)}>count++</button>
      </p>
      <Link to="/">home</Link>
    </div>
  );
};

const Ccc = () => {
  return (
    <div>
      <p>ccc</p>
      <Link to="/">home</Link>
    </div>
  );
};

const routes = [
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Aaa></Aaa>,
      },
      {
        path: "/bbb",
        element: <Bbb></Bbb>,
      },
      {
        path: "/ccc",
        element: <Ccc></Ccc>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <KeepAliveLayout keepPaths={[/bbb/, "/"]}>
      <RouterProvider router={router}></RouterProvider>
    </KeepAliveLayout>
  );
}

export default App;
