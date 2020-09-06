// Indico que este componente va a tener estado propio
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importar modulo para conectar el componente con el store
import { connect } from 'react-redux';
// Importar las acciones a ejecutar en el store a través de este componente
import { registerRequest } from '../actions';
// Importar estilos
import '../assets/styles/containers/Register.scss';

// El componente ejecuta acciones contra el store, por tanto activo sus props
const Register = (props) => {
// Declaro el estado inicial del componente (la propiedad form representa toda el formulario, por ello le paso un objeto con el valor de incio de cada uno de sus campos)
  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });
  // Funcion controladora de evento que se dispara cuando uno de los campos de formulario cambia su valor. (onChange)
  const handleInput = (event) => {
    // Establezco el nuevo estado del componente segun los valores actuales de cada input, pero conservando los anteriores (destructuración)
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Función controladora de evento que se ejecuta tras dispararse el envio del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Disparamos la acción registrar el usuario en el store
    props.registerRequest(form);
    // Redireccionar a otra ruta.
    props.history.push('/');
  };

  return (
    <section className='register'>
      <section className='register__container'>
        <h2>Regístrate</h2>
        <form className='register__container--form' onSubmit={handleSubmit}>
          <input
            name='name'
            className='input'
            type='text'
            placeholder='Nombre'
            onChange={handleInput}
          />
          <input
            name='email'
            className='input'
            type='text'
            placeholder='Email'
            onChange={handleInput}
          />
          <input
            name='password'
            className='input'
            type='password'
            placeholder='Contraseña'
            onChange={handleInput}
          />

          <button className='button' type='submit' onClick={handleSubmit}>Registrarme</button>
        </form>
        <Link to='/login'>
          Iniciar sesión
        </Link>
      </section>
    </section>
  );
};

// Establecer que acciones llevará a cabo este componente en el store
const mapDispatchProps = {
  registerRequest,
};

// Conectar el componente con el store
export default connect(null, mapDispatchProps)(Register);
