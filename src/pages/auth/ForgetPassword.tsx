import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'
import useForm from '../../hooks/useForm'

const ForgetPassword = () => {
  const [alert, setAlert] = useState({ msg: '', error: false })

  const { email, onChange, resetForm } = useForm({
    email: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email === '' || email.length < 6) {
      setAlert({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
    try {
      const url = `/usuarios/olvide-password`

      const { data } = await clientAxios.post(url, { email })
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
        Recupera tu acceso no pierdas tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {alert.msg.length !== 0 && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
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

        <input
          type='submit'
          value='Enviar Instrucciones'
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
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default ForgetPassword
