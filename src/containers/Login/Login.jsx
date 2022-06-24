import Modal from '../../components/UI/Modal/Modal';
import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import './Login.css'
import { loginUser } from '../../store/reducers/game.reducer';
import { useNavigate } from 'react-router-dom';
// import Form from '../../components/Form/Form';


function Login() {
	const nav = useNavigate()
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);
	const [userValid, setUserValid] = useState(false);
	const [userError, setUserError] = useState('');


	useEffect(() => {
		setShow(true);
	}, []);

	const changeName = (e) => {
		if(e.target.value.length > 3){
			setUser(e.target.value)
			const res = /^[A-zА-я0-9_.]+$/.exec(user)
			if(!res){
				setUserValid(true);
				setUserError('Некорректное имя')
			}else{
				setUserValid(false);
				setUserError('')

			}
		}else{
			setUserValid(true);
			setUserError('Минимально от 3 символов')
		}
	}
	
	const login = (e) => {
		e.preventDefault();
		if(user){
			dispatch(loginUser(user));
			setShow(false);
			nav('/game')
		}
	}

  return (
	  <div className='container'>
		  <Modal show={show} >
		
		  <form className='modal-form' onSubmit={login}>
           <div className="form-group">
			{(userValid && userError) && <div style={{color: 'red'}} >{userError}</div>} 
             <label htmlFor="name" className='modal-form__label'>Как вас зовут?</label>

             <input
              type="text"
              name="name"
              onChange={changeName}
              className='modal-form__input'
              placeholder='Введите свое имя'
              id="name"
			  required='user'
            />
          </div>
          {userValid === false ? <button className='modal-form__btn'>Войти</button> : <button className='modal-form__btn modal-form__btn--dis' disabled>Вoйти</button>}
        </form>
			{/* <Form/> */}
		  </Modal>
	  </div>
  )
}

export default Login