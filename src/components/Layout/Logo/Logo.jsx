import React from 'react'
import { NavLink } from 'react-router-dom'
import './Logo.css'
import img from './pngwing.png'

function Logo() {
  return (
	<div className='logo'>
		<NavLink to='/'><img className='logo__img' src={img} alt="" /></NavLink>
	</div>
  )
}

export default Logo