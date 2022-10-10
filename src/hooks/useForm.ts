import React, { ChangeEvent, useState } from 'react'

const useForm = <T>(initialState: T) => {
  const [state, setState] = useState(initialState)

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = (reset?: T) => {
    setState(reset ? reset : initialState)
  }

  return { ...state, onChange, resetForm }
}

export default useForm
