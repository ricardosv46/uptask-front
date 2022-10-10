import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useForm from '../hooks/useForm'
import useProyects from '../hooks/useProyects'
import Alert from './Alert'

const FormProyect = () => {
  const params = useParams()
  const [id, setId] = useState<undefined | string>(undefined)
  const { showAlert, alert, submitProyect, proyect } = useProyects()
  const { nombre, descripcion, fechaEntrega, cliente, onChange, resetForm } =
    useForm({
      nombre: '',
      descripcion: '',
      fechaEntrega: '',
      cliente: ''
    })

  useEffect(() => {
    if (params.id) {
      setId(proyect._id)
      resetForm({
        nombre: proyect.nombre,
        descripcion: proyect.descripcion,
        fechaEntrega: proyect.fechaEntrega?.split('T')[0] ?? '',
        cliente: proyect.cliente
      })
    }
  }, [params])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      showAlert({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
    await submitProyect({ _id: id, nombre, descripcion, fechaEntrega, cliente })
    setId(undefined)
    resetForm()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg'
    >
      {alert.msg && <Alert alert={alert} />}
      <div className='mb-5'>
        <label
          htmlFor='nombre'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Nombre Proyecto
        </label>
        <input
          id='nombre'
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-500 '
          placeholder='Nombre del proyecto'
          name='nombre'
          value={nombre}
          onChange={onChange}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='descripcion'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Descripción
        </label>
        <textarea
          id='descripcion'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-500 '
          placeholder='Descripción del proyecto'
          name='descripcion'
          value={descripcion}
          onChange={onChange}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='fecha-entrega'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Fecha Entrega
        </label>
        <input
          id='fecha-entrega'
          type='date'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-500 '
          name='fechaEntrega'
          value={fechaEntrega}
          onChange={onChange}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='cliente'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Nombre Proyecto
        </label>
        <input
          id='cliente'
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-500 '
          placeholder='Nombre del proyecto'
          name='cliente'
          value={cliente}
          onChange={onChange}
        />
      </div>
      <input
        type='submit'
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className='bg-sky-600 text-white p-3 uppercase font-bold w-full rounded cursor-pointer hover:bg-sky-800 transition-colors ease-in-out duration-500'
      />
    </form>
  )
}

export default FormProyect
