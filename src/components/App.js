import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./Homepage";
import About from "./About";
import ProjectList from "./ProjectList";
import ProjectDetail from "./ProjectDetail";

import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
        <Route exact path="/projects" component={ProjectList} />
        <Route path="/projects/:dinossauro" component={ProjectDetail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
