import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./Homepage";
import About from "./About";

import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </div>
  );
}

export default App;
