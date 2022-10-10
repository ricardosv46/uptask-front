import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'
import useAuth from '../../hooks/useAuth'
import useForm from '../../hooks/useForm'

const Login = () => {
  const [alert, setAlert] = useState({ msg: '', error: false })
  const { email, password, onChange } = useForm({ email: '', password: '' })
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlert({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
    try {
      const { data } = await clientAxios.post('/usuarios/login', {
        email,
        password
      })
      localStorage.setItem('token', data.token)
      navigate('/proyects')
    } catch (error: any) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }
  return (
    <>
      <h1 className='text-6xl font-black capitalize text-sky-600'>
        Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>
      {alert.msg.length !== 0 && <Alert alert={alert} />}
      <form onSubmit={handleSubmit} className='p-10 my-10 bg-white rounded-lg shadow'>
        <div className='my-5'>
          <label htmlFor='email' className='block text-xl font-bold text-gray-600 uppercase'>
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email de Registro'
            className='w-full p-3 mt-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>
        <div className='my-5'>
          <label htmlFor='password' className='block text-xl font-bold text-gray-600 uppercase'>
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Password de Registro'
            className='w-full p-3 mt-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 mb-5 font-bold text-white uppercase transition-colors duration-300 rounded-lg bg-sky-600 hover:cursor-pointer hover:bg-sky-800'>
          Iniciar Sesión
        </button>
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link className='block my-5 text-sm text-center uppercase text-slate-500' to='/register'>
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link className='block my-5 text-sm text-center uppercase text-slate-500' to='/forget-password'>
          Olvide mi Password
        </Link>
      </nav>
    </>
  )
}

export default Login
