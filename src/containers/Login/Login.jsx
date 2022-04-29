import Modal from '../../components/UI/Modal/Modal';
import React, { useEffect, useState } from 'react';
// import Backdrop from '../../components/UI/Backdrop/Backdrop';
import {useDispatch} from 'react-redux';
import './Login.css'
import { loginUser } from '../../store/reducers/auth.reducer';


function Login() {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const [user, setUser] = useState('')

	useEffect(() => {
		setShow(true);
	}, []);

	const changeName = (e) => {
		setUser(e.target.value)
	}
	
	const login = (e) => {
		e.preventDefault();
		dispatch(loginUser(user));
		setShow(false);
	}

  return (
	  <div className='container'>
		  <Modal show={show} >
			<form className='modal-form' onSubmit={login}>
				<label className='modal-form__label' htmlFor="name">Как вас зовут?</label>
				<input id='name' onChange={changeName} className='modal-form__input' type="text" placeholder='Введите свое имя' />
				<button className='modal-form__btn'>Войти</button>
			</form>
		  </Modal>
	  </div>
  )
}

export default Login