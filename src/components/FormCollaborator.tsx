import useForm from '../hooks/useForm'
import useProyects from '../hooks/useProyects'
import Alert from './Alert'

const FormCollaborator = () => {
  const { showAlert, alert, submitCollaborator } = useProyects()
  const { email, onChange } = useForm({ email: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email === '') {
      showAlert({ msg: 'El Email es obligatorio', error: true })
      return
    }
    submitCollaborator(email)
  }

  return (
    <form
      className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert alert={alert} />}
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Email Colaborador
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={onChange}
          placeholder='Email del usuario'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-600'
        />
      </div>
      <input
        type='submit'
        value='Buscar Colaborador'
        className='bg-sky-600 hover:bg-sky-800 w-full p-3 text-white uppercase font-bold text-sm cursor-pointer transition-colors duration-300 rounded'
      />
    </form>
  )
}

export default FormCollaborator
