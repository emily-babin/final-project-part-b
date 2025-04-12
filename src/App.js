// See TODO for why the ProjectPage parts are commented out.

import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
// import ProjectPage from './components/Pages/Project/ProjectPage';
import ItemsPage from './components/Pages/Items/ItemsPage';
import CategoriesPage from './components/Pages/Categories/CategoriesPage';

const App = props => {
  return (
    <Router>
      <div className="App">
        <NavBar/>
  
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/project" element={<ProjectPage />} /> */}
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;