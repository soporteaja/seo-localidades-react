import React from "react";
import CSVProcessor from "./components/CSVProcessor";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div>
        <CSVProcessor />
      </div>
    </ErrorBoundary>
  );
}

export default App;