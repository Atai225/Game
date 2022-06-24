import './App.css';
import {Routes, Route} from 'react-router-dom'
import Game from './containers/Game/Game';
import Statisctic from './containers/Statistic/Statisctic'
import Login from './containers/Login/Login';
import Layout from './components/Layout/Layout'

function App() {
  return (
   
      <Layout>
        <Routes>
           <Route path='/' element={<Login/>}/>
            <Route path='/game' element={<Game/>}/>
            <Route path='/statistics' element={<Statisctic/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
