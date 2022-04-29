import React from 'react'
import Toolbar from './Toolbar/Toolbar'
import './Layout.css'

function Layout(props) {
  return (
    <>
        <Toolbar/>
        <main className="main-wrapper">
            {props.children}
        </main>
    </>
  )
}

export default Layout