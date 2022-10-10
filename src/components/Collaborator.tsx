import useProyects from '../hooks/useProyects'
import { Collaborator as Props } from '../interfaces'

const Collaborator = ({ _id, nombre, email }: Props) => {
  const { handleModalDeleteCollaborator } = useProyects()
  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p>{nombre}</p>
        <p className='text-sm text-gray-700'>{email}</p>
      </div>
      <div>
        <button
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          type='button'
          onClick={() => handleModalDeleteCollaborator({ _id, nombre, email })}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Collaborator
