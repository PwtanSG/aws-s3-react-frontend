import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./Pages/ProductList";
import ProductView from "./Pages/ProductView";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductView />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
