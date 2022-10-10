import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({ msg: '', error: false })
  const [accountConfirm, setAccountConfirm] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clientAxios(url)
        setAlert({ msg: data.msg, error: false })
        setAccountConfirm(true)
      } catch (error: any) {
        setAlert({ msg: error.response.data.msg, error: true })
      }
    }
    confirmAccount()
  }, [])

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tue comienza a crear a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {alert.msg.length !== 0 && <Alert alert={alert} />}
        {accountConfirm && (
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/'
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount
