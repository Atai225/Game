// import React from "react";
// import Login from "../../containers/Login/Login";
// import './Form.css'

// class Form extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       input: {},
// 		errors: {},
//     };

//     this.handleChange = this.handleChange.bind(this);

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let input = this.state.input;
//     input[event.target.name] = event.target.value;
//     this.setState({
//       input,
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     if (this.validate()) {
//       console.log(this.state);
//       let input = {};
//       input["name"] = "";
//       this.setState({ input: input });
//     }
//   }

//   validate() {
//     let input = this.state.input;

//     let errors = {};

//     let isValid = true;

//     if (!input["name"]) {
//       isValid = false;
//       errors["name"] = "Please enter your name.";
//     }
	
// 	if (input["name"].length < 3) {
// 		isValid = false;
// 		errors["name"] = "Invalid";
// 	}
	  


//     this.setState({
//       errors: errors,
//     });

//     return isValid;
//   }

//   render() {
//     return (
//       <<form className='modal-form' onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name" className='modal-form__label'>Как вас зовут?</label>

//             <input
//               type="text"
//               name="name"
//               value={this.state.input.name}
//               onChange={this.handleChange}
//               className='modal-form__input'
//               placeholder='Введите свое имя'
//               id="name"
//             />
//             <div className="text-danger">{this.state.errors.name}</div>
//           </div>
//           <button className='modal-form__btn'>Войти</button>
//         </form>div>
//         
// 		<Login a = {this.state.input}/>
//       </div>
//     );
//   }
// }

// export default Form;
