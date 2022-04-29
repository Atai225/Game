import './App.css';
import {Routes, Route} from 'react-router-dom'
import Game from './containers/Game/Game';
import Statisctic from './containers/Statistic/Statisctic'
import { useSelector } from 'react-redux';
import Login from './containers/Login/Login';
import Layout from './components/Layout/Layout'

function App() {
  const user = useSelector(store => store.auth.user)
  return (
   
      <Layout>
        <Routes>
           {!user ? <Route path='*' element={<Login/>}/> : 
          <>
            <Route path='/' element={<Game/>}/>
            <Route path='/statistics' element={<Statisctic/>}/>
          </>
          }
        </Routes>
      </Layout>
  );
}

export default App;
