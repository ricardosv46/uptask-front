import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyects from '../hooks/useProyects'
import Search from './Search'

const Header = () => {
  const { toogleSearching, logoutProyects } = useProyects()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    logoutProyects()
    localStorage.removeItem('token')
  }
  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='mb-5 text-4xl font-black text-center text-sky-600 md:mb-0'>UpTask</h2>

        <div className='flex flex-col items-center gap-4 md:flex-row'>
          <button type='button' className='font-black uppercase' onClick={toogleSearching}>
            Buscar proyecto
          </button>
          <Link to='/proyects' className='font-black uppercase'>
            Proyectos
          </Link>
          <button type='button' onClick={handleLogout} className='p-3 text-sm font-bold text-white uppercase rounded-md bg-sky-600'>
            Cerrar Sesión
          </button>
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Header
