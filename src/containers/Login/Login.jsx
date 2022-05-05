import Modal from '../../components/UI/Modal/Modal';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import './Login.css'
import { loginUser } from '../../store/reducers/auth.reducer';
import { useNavigate } from 'react-router-dom';
// import Form from '../../components/Form/Form';


function Login() {
	const nav = useNavigate()
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const [user, setUser] = useState('')

	// useEffect(() => {
	// 	setShow(true);
	// 	console.log(jj);
	// }, []);

	const changeName = (e) => {
		setUser(e.target.value)
	}
	
	const login = (e) => {
		e.preventDefault();
		dispatch(loginUser(user));
		setShow(false);
		nav('/game')
	}

  return (
	  <div className='container'>
		  <Modal show={show} >
		  <form className='modal-form' onSubmit={login}>
           <div className="form-group">
             <label htmlFor="name" className='modal-form__label'>Как вас зовут?</label>

             <input
              type="text"
              name="name"
              value={this.state.input.name}
              onChange={changeName}
              className='modal-form__input'
              placeholder='Введите свое имя'
              id="name"
            />
            <div className="text-danger">{this.state.errors.name}</div>
          </div>
          <button className='modal-form__btn'>Войти</button>
        </form>
			{/* <Form/> */}
		  </Modal>
	  </div>
  )
}

export default Login