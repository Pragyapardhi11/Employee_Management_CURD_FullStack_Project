import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './assets/Dashboard/Dashboard';
import PostUser from './assets/Employee/PostUser';
import UpdateUser from './assets/Employee/UpdateUser';

import Header from './assets/Header/Header';
import NoMatch from './assets/NoMatch/NoMatch';


function App() {

  return (
    <>
      <Header/>
      {/* <Router> */}
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/employee' element={<PostUser/>}/>
        <Route path='/employee/:id' element={<UpdateUser/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
      {/* </Router> */}
      
    </>
  )
}

export default App;
