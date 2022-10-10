import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import Alert from '../../components/Alert'
import Collaborator from '../../components/Collaborator'
import ModalDeleteCollaborator from '../../components/ModalDeleteCollaborator'
import ModalDeleteTask from '../../components/ModalDeleteTask'
import ModalForm from '../../components/ModalForm'
import Spinner from '../../components/Spinner'
import Task from '../../components/Task'
import useAmin from '../../hooks/useAdmin'
import useProyects from '../../hooks/useProyects'

let socket: any

const Proyect = () => {
  const { id } = useParams() as { id: string }
  const {
    getProyect,
    proyect,
    loading,
    toogleModalForm,
    submitTaskProyect,
    deleteTaskProyect,
    modalDeleteTask,
    updateTaskProyect,
    updateEstadoTaskProyect
  } = useProyects()
  const admin = useAmin()
  console.log(modalDeleteTask)

  useEffect(() => {
    getProyect(id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', id)
    return () => {
      socket.off('abrir proyecto')
    }
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva: any) => {
      if (tareaNueva.proyecto === proyect._id) {
        submitTaskProyect(tareaNueva)
      }
    })

    socket.on('tarea eliminada', (tareaEliminada: any) => {
      if (tareaEliminada.proyecto === proyect._id) {
        deleteTaskProyect(tareaEliminada)
      }
    })

    socket.on('tarea actualizada', (tareaActualizada: any) => {
      if (tareaActualizada.proyecto._id === proyect._id) {
        updateTaskProyect(tareaActualizada)
      }
    })

    socket.on('nuevo estado', (tareaEstado: any) => {
      if (tareaEstado.proyecto._id === proyect._id) {
        updateEstadoTaskProyect(tareaEstado)
      }
    })

    return () => {
      socket.off('tarea agregada')
      socket.off('tarea eliminada')
      socket.off('tarea actualizada')
      socket.off('nuevo estado')
    }
  }, [])

  if (loading) return <Spinner />

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-black'>{proyect.nombre}</h1>
        {admin && (
          <div className='flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-black'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
            <Link to={`/proyects/edit/${id}`} className='font-bold uppercase'>
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          onClick={toogleModalForm}
          type='button'
          className='flex items-center justify-center w-full gap-2 px-5 py-3 mt-5 text-sm font-bold text-center text-white uppercase rounded-lg md:w-auto bg-sky-600'>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className='mt-10 text-xl font-bold'>Tareas del Proyecto</p>

      <div className='mt-10 bg-white rounded-lg shadow'>
        {proyect.tareas?.length ? (
          proyect.tareas?.map((task) => <Task key={task._id} {...task} />)
        ) : (
          <p className='p-10 my-5 text-center'>No hay tareas en este proyecto</p>
        )}
      </div>
      {admin && (
        <>
          <div className='flex items-center justify-between mt-10'>
            <p className='text-xl font-bold '>Colaboradores</p>
            <Link
              to={`/proyects/new-collaborator/${proyect._id}`}
              className='font-bold text-gray-400 uppercase transition-colors duration-500 hover:text-black'>
              Añadir
            </Link>
          </div>
          <div className='mt-10 bg-white rounded-lg shadow'>
            {proyect.colaboradores?.length ? (
              proyect.colaboradores?.map((collaborator) => <Collaborator key={collaborator._id} {...collaborator} />)
            ) : (
              <p className='p-10 my-5 text-center'>No hay colaboradores en este proyecto</p>
            )}
          </div>{' '}
        </>
      )}

      <ModalForm />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  )
}

export default Proyect
