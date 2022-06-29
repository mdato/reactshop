import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Trolley from "./components/Trolley";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/trolley">
          <Trolley />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
