import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Grid from "./components/Grid/Grid";
import Rain from "./components/Rain/Rain";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Grid />} />
      <Route path="/rain"  element={<Rain />} />
    </Routes>
  </Router>
);

export default App;
