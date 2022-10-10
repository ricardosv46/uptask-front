export interface User {
  _id: string
  nombre: string
  email: string
  token: string
}

export interface Proyect {
  _id: string
  creador: string
  nombre: string
  descripcion: string
  cliente: string
  fechaEntrega: string
  tareas: Task[]
  colaboradores: Collaborator[]
}
export interface Collaborator {
  _id: string
  email: string
  nombre: string
}
export interface Task {
  _id: string
  nombre: string
  descripcion: string
  prioridad: string
  proyecto?: string
  fechaEntrega: string
  estado: boolean
  completado?: { nombre: string; _id: string }
}

export interface UserPost {
  _id: string
  nombre: string
  email: string
  token: string
}

export interface ProyectPost {
  _id?: string
  nombre: string
  descripcion: string
  cliente: string
  fechaEntrega: string
}

export interface TaskPost {
  _id?: string
  nombre: string
  descripcion: string
  fechaEntrega: string
  prioridad: string
  proyecto: string
  estado?: boolean
  completado?: { nombre: string; _id: string }
}
