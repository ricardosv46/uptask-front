import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'
import useForm from '../../hooks/useForm'

const Register = () => {
  const [alert, setAlert] = useState({ msg: '', error: false })
  const { nombre, email, password, repeatPassword, onChange, resetForm } =
    useForm({
      nombre: '',
      email: '',
      password: '',
      repeatPassword: ''
    })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([nombre, email, password, repeatPassword].includes('')) {
      setAlert({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
    if (password !== repeatPassword) {
      setAlert({ msg: 'Los passwords no son iguales', error: true })
      return
    }
    if (password.length < 6) {
      setAlert({
        msg: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }
    setAlert({ msg: '', error: false })
    try {
      const { data } = await clientAxios.post('/usuarios', {
        nombre,
        email,
        password
      })
      setAlert({
        msg: data.msg,
        error: false
      })
      resetForm()
    } catch (error: any) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Crea tu cuenta y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {alert.msg.length !== 0 && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
        <div className='my-5'>
          <label
            htmlFor='nombre'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Nombre
          </label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={nombre}
            onChange={onChange}
            placeholder='Tu Nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>

        <div className='my-5'>
          <label
            htmlFor='email'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor='password'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Password de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor='password2'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Repetir Password
          </label>
          <input
            id='password2'
            type='password'
            name='repeatPassword'
            value={repeatPassword}
            onChange={onChange}
            placeholder='Repetir tu Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>
        <input
          type='submit'
          value='Crear Cuenta'
          className='mb-5 bg-sky-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors  duration-300'
        />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/forget-password'
        >
          Olvide mi Password
        </Link>
      </nav>
    </>
  )
}

export default Register
