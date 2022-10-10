import React from 'react'
import FormProyect from '../../components/FormProyect'

const NewProyect = () => {
  return (
    <>
      <h1 className='text-4xl font-black'>Crear Proyecto</h1>
      <div className='mt-10 flex justify-center'>
        <FormProyect />
      </div>
    </>
  )
}

export default NewProyect
