import formDate from '../helpers/formDate'
import useAmin from '../hooks/useAdmin'
import useProyects from '../hooks/useProyects'
import { Task as Tasks } from '../interfaces'

const Task = ({ _id, descripcion, nombre, prioridad, fechaEntrega, estado, completado, proyecto }: Tasks) => {
  const { handleEditTask, handleModalDeleteTask, completeTask } = useProyects()
  const admin = useAmin()

  return (
    <div className='flex items-center justify-between p-5 border-b'>
      <div className='flex flex-col items-start'>
        <p className='mb-1 text-xl'>{nombre}</p>
        <p className='mb-1 text-sm text-gray-500 uppercase'>{descripcion}</p>
        <p className='mb-1 text-sm'>{formDate(fechaEntrega)}</p>
        <p className='mb-1 text-gray-600'>Prioridad: {prioridad}</p>
        {estado && <p className='px-2 py-1 text-xs text-white uppercase bg-green-600 rounded-lg'>Completada por : {completado?.nombre}</p>}
      </div>
      <div className='flex flex-col gap-2 text-white md:flex-row'>
        {admin && (
          <button
            onClick={() =>
              handleEditTask({
                _id,
                descripcion,
                nombre,
                prioridad,
                fechaEntrega,
                estado
              })
            }
            className='px-4 py-3 text-sm font-bold uppercase bg-indigo-600 rounded-lg'>
            Editar
          </button>
        )}

        <button
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 uppercase font-bold rounded-lg text-sm`}
          onClick={() => completeTask(_id)}>
          {estado ? 'Completa' : 'Incompleta'}
        </button>

        {admin && (
          <button
            onClick={() =>
              handleModalDeleteTask({
                _id,
                descripcion,
                nombre,
                prioridad,
                fechaEntrega,
                estado,
                proyecto
              })
            }
            className='px-4 py-3 text-sm font-bold uppercase bg-red-600 rounded-lg'>
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Task
