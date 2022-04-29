import React from 'react'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'
import styles from './Toolbar.module.css';

function Toolbar() {
  return (
	<header className={styles.header}>
			
			<Logo/>
		
			<Navigation/>
	</header>
  )
}

export default Toolbar