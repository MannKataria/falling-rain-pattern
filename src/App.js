import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Rain from "./components/Rain/Rain";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Rain />} />
    </Routes>
  </Router>
);

export default App;
