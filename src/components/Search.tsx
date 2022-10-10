import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useProyects from '../hooks/useProyects'
import { Proyect } from '../interfaces'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Search = () => {
  const [busqueda, setBusqueda] = useState('')
  console.log(busqueda)
  const { searching, toogleSearching, proyects, proyect } = useProyects()

  const proyectosFiltrados =
    busqueda === ''
      ? []
      : proyects.filter((proyect) =>
          proyect.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )

  return (
    <Transition.Root
      show={searching}
      as={Fragment}
      afterLeave={() => setBusqueda('')}
    >
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20'
        onClose={toogleSearching}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            value={proyect}
            onChange={(proyect: Proyect) =>
              (window.location.href = `/proyects/${proyect._id}`)
            }
            as='div'
            className='mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
          >
            <div className='relative'>
              <Combobox.Input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 rounded-xl focus:ring-0 outline-sky-600 sm:text-sm'
                placeholder='Buscar...'
              />
            </div>

            {proyectosFiltrados.length > 0 && (
              <Combobox.Options
                static
                className='max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'
              >
                {proyectosFiltrados.map((proyect) => (
                  <Combobox.Option
                    key={proyect._id}
                    value={proyect}
                    className={({ active }) =>
                      classNames(
                        'cursor-default select-none px-4 py-2',
                        active && 'bg-sky-600 text-white'
                      )
                    }
                  >
                    {proyect.nombre}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default Search
