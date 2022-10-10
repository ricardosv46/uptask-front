import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import FormCollaborator from '../../components/FormCollaborator'
import Spinner from '../../components/Spinner'
import useProyects from '../../hooks/useProyects'

const NewCollaborator = () => {
  const { getProyect, proyect, loading, collaborator, addCollaborator, alert } =
    useProyects()

  const { id } = useParams() as { id: string }

  useEffect(() => {
    getProyect(id)
  }, [])

  if (!proyect._id) return <Alert alert={alert} />

  return (
    <>
      <h1 className='text-4xl font-black'>
        Añadir Colaborador(a) al Proyecto : {proyect.nombre}
      </h1>
      <div className='mt-10 flex justify-center'>
        <FormCollaborator />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        collaborator._id && (
          <div className='flex justify-center mt-10'>
            <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
              <h2 className='text-center mb-10 text-2xl font-bold'>
                Resultado:
              </h2>
              <div className='flex justify-between items-center'>
                <p> {collaborator.nombre}</p>
                <button
                  type='button'
                  className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white text-sm font-bold'
                  onClick={() => {
                    addCollaborator(collaborator.email)
                  }}
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default NewCollaborator
