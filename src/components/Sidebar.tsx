import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { user } = useAuth()

  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w1/6 px-5 py-10'>
      <p className='text-xl font-bold'>Hola: {user.nombre}</p>
      <Link
        to='create-proyect'
        className='w-full bg-sky-600 p-3 text-white uppercase font-bold block rounded-lg mt-5 text-center'
      >
        Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar
