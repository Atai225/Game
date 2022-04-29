import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import styles from './Navigation.module.css'
import cn from 'classnames'

function Navigation() {
	const location = useLocation();

  return (
	<>	
		<nav className={styles.nav}>
			<NavLink to='/' className={cn(`${styles.navlink}`,
			{activeLink: location.pathname === '/'})}>Игра</NavLink>
			<NavLink to='/statistics' className={cn(`${styles.navlink}`,
			{activeLink: location.pathname === '/statistics'})}>
				Статистика
			</NavLink>
		</nav>
		<style jsx>{`
			.activeLink{
				background: #ffffff;
				padding: 4px 8px;
				border-radius: 10px;
				color: black;
			}
			

		`}</style>
	</>
	)
}

export default Navigation