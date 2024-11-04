import 'bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import View from './pages/View';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';

function App() {
  return (
    <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreateUser />} />
            <Route path='/view/:id' element={<View />} />
            <Route path='/update/:id' element={<UpdateUser />} />
            <Route path='*' element={<div className='bg-light vh-100 w-100 d-flex align-items-center justify-content-center '><div className='container '><div className='d-flex align-items-center justify-content-center h1 '>NO ROUTE <Link to='/' className='btn btn-danger btn-lg px-5 ms-5'>Back</Link></div></div></div>} />
          </Routes>
    </Router>
  );
}

export default App;
