// src/App.js

import React from "react";
import "./App.css";
import WebSocketComponent from "./WebSocketComponent";

function App() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950">
      <header className="container p-4 bg-none">
        <WebSocketComponent />
      </header>
    </div>
  );
}

export default App;
