import React, { useState, useEffect, createContext, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import clientAxios from '../config/clientAxios'
import useAuth from '../hooks/useAuth'
import { Collaborator, Proyect, ProyectPost, Task, TaskPost } from '../interfaces'

interface IProvider {
  children: ReactNode
}

interface Alert {
  msg: string
  error: boolean
}

interface ProyectsInitialState {
  alert: Alert
  proyects: Proyect[]
  proyect: Proyect
  task: Task
  loading: boolean
  modalForm: boolean
  modalDeleteTask: boolean
  modalDeleteCollaborator: boolean
  collaborator: Collaborator
  searching: boolean
}

let socket: any

export interface ProyectsContextValue extends ProyectsInitialState {
  showAlert: (alert: Alert) => void
  submitProyect: (proyecto: ProyectPost) => Promise<void>
  getProyect: (id: string) => Promise<void>
  deleteProyect: (id: string) => Promise<void>
  toogleModalForm: () => void
  submitTask: (task: TaskPost) => Promise<void>
  handleEditTask: (task: Task) => Promise<void>
  handleModalDeleteTask: (task?: Task) => void
  deleteTask: () => Promise<void>
  submitCollaborator: (id: string) => Promise<void>
  addCollaborator: (id: string) => Promise<void>
  handleModalDeleteCollaborator: (collaborator?: Collaborator) => void
  deleteCollaborator: () => Promise<void>
  completeTask: (id: string) => Promise<void>
  toogleSearching: () => void
  submitTaskProyect: (task: Task) => void
  deleteTaskProyect: (task: Task) => void
  updateTaskProyect: (task: Task) => void
  updateEstadoTaskProyect: (task: Task) => void
  logoutProyects: () => void
}

const initialState: ProyectsInitialState = {
  alert: {} as Alert,
  proyects: [] as Proyect[],
  proyect: {} as Proyect,
  task: {} as Task,
  loading: false,
  modalForm: false,
  modalDeleteTask: false,
  modalDeleteCollaborator: false,
  collaborator: {} as Collaborator,
  searching: false
}

const ProyectsContext = createContext({} as ProyectsContextValue)

const ProyectsProvider = ({ children }: IProvider) => {
  const [state, setState] = useState(initialState)
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  useEffect(() => {
    const getProyects = async () => {
      setState((prev) => ({ ...prev, loading: true }))
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clientAxios('/proyectos', config)
        setState((prev) => ({
          ...prev,
          proyects: data
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    }
    getProyects()
  }, [isAuth])

  const showAlert = (alert: Alert) => {
    setState((prev) => ({ ...prev, alert }))
    setTimeout(() => {
      setState((prev) => ({ ...prev, alert: {} as Alert }))
    }, 5000)
  }

  const submitProyect = async (proyect: ProyectPost) => {
    if (proyect._id) {
      await editProyect(proyect)
    } else {
      await createProyect(proyect)
    }
  }

  const editProyect = async (proyect: ProyectPost) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.put(`/proyectos/${proyect._id}`, proyect, config)

      const proyectsUp = state.proyects.map((proyect) => (proyect._id === data._id ? data : proyect))
      setState((prev) => ({
        ...prev,
        proyects: proyectsUp,
        alert: {
          msg: 'Proyecto Actualizado Correctamente',
          error: false
        }
      }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, alert: {} as Alert }))
        navigate('/proyects')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const createProyect = async (proyect: ProyectPost) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.post('/proyectos', proyect, config)
      setState((prev) => ({
        ...prev,
        proyects: [...prev.proyects, data],
        alert: {
          msg: 'Proyecto Creado Correctamente',
          error: false
        }
      }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, alert: {} as Alert }))
        navigate('/proyects')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const getProyect = async (id: string) => {
    setState((prev) => ({
      ...prev,
      loading: true
    }))
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios(`/proyectos/${id}`, config)

      setState((prev) => ({
        ...prev,
        proyect: data,
        alert: {} as Alert
      }))
    } catch (error: any) {
      navigate('/proyects')
      setState((prev) => ({
        ...prev,
        alert: { msg: error.response.data.msg, error: true }
      }))

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          alert: {} as Alert
        }))
      }, 3000)
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false
      }))
    }
  }

  const deleteProyect = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.delete(`/proyectos/${id}`, config)
      const proyectsUp = state.proyects.filter((proyects) => proyects._id !== id)
      setState((prev) => ({
        ...prev,
        proyects: proyectsUp,
        alert: {
          msg: data.msg,
          error: false
        }
      }))

      setTimeout(() => {
        setState((prev) => ({ ...prev, alert: {} as Alert }))
        navigate('/proyects')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const toogleModalForm = () => {
    setState((prev) => ({
      ...prev,
      modalForm: !prev.modalForm,
      task: {} as Task
    }))
  }

  const submitTask = async (task: TaskPost) => {
    if (task?._id) {
      await editTask(task)
    } else {
      await createTask(task)
    }
  }

  const editTask = async (task: TaskPost) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.put(`/tareas/${task._id}`, task, config)

      socket.emit('actualizar tarea', data)

      setState((prev) => ({
        ...prev,
        alert: {} as Alert,
        modalForm: false
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task: TaskPost) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.post(`/tareas`, task, config)

      setState((prev) => ({
        ...prev,
        alert: {} as Alert,
        modalForm: false
      }))

      //Socket io
      socket.emit('nueva tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditTask = async (task: Task) => {
    setState((prev) => ({
      ...prev,
      task,
      modalForm: true
    }))
  }

  const handleModalDeleteTask = (task?: Task) => {
    if (task) {
      setState((prev) => ({
        ...prev,
        task,
        modalDeleteTask: !prev.modalDeleteTask
      }))
    } else {
      setState((prev) => ({
        ...prev,
        modalDeleteTask: !prev.modalDeleteTask
      }))
    }
  }

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.delete(`/tareas/${state.task._id}`, config)

      // Socket io
      socket.emit('eliminar tarea', state.task)

      setState((prev) => ({
        ...prev,
        alert: { msg: data.msg, error: false },
        modalDeleteTask: false,
        task: {} as Task
      }))

      setTimeout(() => {
        setState((prev) => ({ ...prev, alert: {} as Alert }))
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const submitCollaborator = async (email: string) => {
    setState((prev) => ({
      ...prev,
      loading: true
    }))

    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.post(`/proyectos/colaboradores`, { email }, config)
      setState((prev) => ({
        ...prev,
        collaborator: data
      }))
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        alert: { msg: error.response.data.msg, error: true }
      }))
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false
      }))
    }
  }

  const addCollaborator = async (email: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.post(`/proyectos/colaboradores/${state.proyect._id}`, { email }, config)
      setState((prev) => ({
        ...prev,
        alert: { msg: data.msg, error: false },
        collaborator: {} as Collaborator
      }))
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          alert: {} as Alert
        }))
      }, 3000)
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        alert: { msg: error.response.data.msg, error: true }
      }))
    }
  }

  const handleModalDeleteCollaborator = (collaborator?: Collaborator) => {
    if (collaborator) {
      setState((prev) => ({
        ...prev,
        modalDeleteCollaborator: !prev.modalDeleteCollaborator,
        collaborator
      }))
    } else {
      setState((prev) => ({
        ...prev,
        modalDeleteCollaborator: !prev.modalDeleteCollaborator
      }))
    }
  }

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.post(`/proyectos/eliminar-colaborador/${state.proyect._id}`, { id: state.collaborator._id }, config)

      const collaboratorsUp = state.proyect.colaboradores.filter((collaborator) => collaborator._id !== state.collaborator._id)

      setState((prev) => ({
        ...prev,
        proyect: { ...prev.proyect, colaboradores: collaboratorsUp },
        alert: { msg: data.msg, error: false },
        collaborator: {} as Collaborator,
        modalDeleteCollaborator: false
      }))
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          alert: {} as Alert
        }))
      }, 3000)
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const completeTask = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clientAxios.post(`/tareas/estado/${id}`, { id: state.collaborator._id }, config)

      //Socket io
      socket.emit('cambiar estado', data)

      setState((prev) => ({
        ...prev,
        task: {} as Task,
        alert: {} as Alert
      }))
    } catch (error: any) {
      console.log(error.response)
    }
  }
  const toogleSearching = () => {
    setState((prev) => ({
      ...prev,
      searching: !prev.searching
    }))
  }

  const submitTaskProyect = (task: Task) => {
    setState((prev) => ({
      ...prev,
      proyect: { ...prev.proyect, tareas: [...prev.proyect.tareas, task] }
    }))
  }

  const deleteTaskProyect = (task: Task) => {
    setState((prev) => ({
      ...prev,
      proyect: { ...prev.proyect, tareas: prev.proyect.tareas.filter((taskState) => taskState._id !== task._id) }
    }))
  }

  const updateTaskProyect = (task: Task) => {
    const tasksUp = state.proyect.tareas.map((taskState) => (taskState._id === task._id ? task : taskState))

    setState((prev) => ({
      ...prev,
      proyect: { ...prev.proyect, tareas: tasksUp }
    }))
  }

  const updateEstadoTaskProyect = (task: Task) => {
    const tasksUp = state.proyect.tareas.map((taskState) => (taskState._id === task._id ? task : taskState))

    setState((prev) => ({
      ...prev,
      proyect: { ...prev.proyect, tareas: tasksUp }
    }))
  }

  const logoutProyects = () => {
    setState(initialState)
  }

  return (
    <ProyectsContext.Provider
      value={{
        ...state,
        showAlert,
        submitProyect,
        getProyect,
        deleteProyect,
        toogleModalForm,
        submitTask,
        handleEditTask,
        handleModalDeleteTask,
        deleteTask,
        submitCollaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        deleteCollaborator,
        completeTask,
        toogleSearching,
        submitTaskProyect,
        deleteTaskProyect,
        updateTaskProyect,
        updateEstadoTaskProyect,
        logoutProyects
      }}>
      {children}
    </ProyectsContext.Provider>
  )
}

export { ProyectsProvider }

export default ProyectsContext
