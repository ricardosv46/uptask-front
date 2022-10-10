import { FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alert from '../../components/Alert'
import useForm from '../../hooks/useForm'
import clientAxios from '../../config/clientAxios'

const NewPassword = () => {
  const [alert, setAlert] = useState({ msg: '', error: false })
  const [validToken, setValidToken] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const { password, onChange, resetForm } = useForm({ password: '' })
  const { token } = useParams()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const url = `/usuarios/olvide-password/${token}`
        await clientAxios(url)
        setValidToken(true)
      } catch (error: any) {
        setAlert({ msg: error.response.data.msg, error: true })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.length < 6) {
      setAlert({
        msg: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }
    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      setAlert({ msg: data.msg, error: false })
      setChangePassword(true)
      resetForm()
    } catch (error: any) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reestable tu password no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {alert.msg.length !== 0 && <Alert alert={alert} />}
      {validToken && (
        <form
          onSubmit={handleSubmit}
          className='my-10 bg-white shadow rounded-lg p-10'
        >
          <div className='my-5'>
            <label
              htmlFor='password'
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Nuevo Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Ingresa tu nuevo password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-sky-400'
            />
          </div>

          <input
            type='submit'
            value='Guardar Nuevo Password'
            className='mb-5 bg-sky-600 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors  duration-300'
          />
        </form>
      )}
      {changePassword && (
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          Inicia Sesión
        </Link>
      )}
    </>
  )
}

export default NewPassword
