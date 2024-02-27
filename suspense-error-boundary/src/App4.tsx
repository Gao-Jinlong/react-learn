import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Bbb() {
  useEffect(() => {
    throw new Error("Bbb error");
  }, []);

  return <div>Bbb</div>;
}

export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div>
            <p>出错了：</p>
            <div>{error.message}</div>
          </div>
        );
      }}
    >
      <Bbb></Bbb>
    </ErrorBoundary>
  );
}
