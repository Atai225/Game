import Toolbar from './Toolbar/Toolbar'
import './Layout.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getClues } from '../../store/reducers/game.reducer'

function Layout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const catID = [8, 21, 111, 1974, 42]
   

    const fetchData = () => {
      const categories = catID.map(id => {
        return new Promise(resolve => {
          fetch(`https://jservice.io/api/category?id=${id}`)
            .then(response => response.json()).then(data => {
              resolve(data);
            });
        });
      });
      Promise.all(categories).then(results => {        
        dispatch(getClues(results))
      });

    }
    fetchData()
  }, [dispatch])

  return (
    <>
        <Toolbar/>
        <main className="main-wrapper">
            {props.children}
        </main>
    </>
  )
}



export default Layout;
  