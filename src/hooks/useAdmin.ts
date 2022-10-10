import useAuth from './useAuth'
import useProyects from './useProyects'

const useAmin = () => {
  const { proyect } = useProyects()
  const { user } = useAuth()

  return proyect.creador === user._id
}

export default useAmin
