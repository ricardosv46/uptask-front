import React, { useEffect } from 'react'

import Alert from '../../components/Alert'
import Proyect from '../../components/Proyect'
import useProyects from '../../hooks/useProyects'

const Proyects = () => {
  const { proyects, alert } = useProyects()

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      {alert.msg && <Alert alert={alert} />}
      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyects.length ? (
          proyects.map((proyect) => <Proyect key={proyect._id} {...proyect} />)
        ) : (
          <p className='mt-5 text-center text-gray-600 uppercase'>
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  )
}

export default Proyects
