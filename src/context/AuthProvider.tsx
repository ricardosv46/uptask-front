import React, { useState, useEffect, createContext, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import { User } from '../interfaces'

interface IProvider {
  children: ReactNode
}

interface AuthInitialState {
  user: User
  loading: boolean
  isAuth: boolean
}

export interface AuthContextValue extends AuthInitialState {
  logout: () => void
}

const initialState: AuthInitialState = {
  user: {} as User,
  loading: true,
  isAuth: false
}

const AuthContext = createContext({} as AuthContextValue)

const AuthProvider = ({ children }: IProvider) => {
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    const authUser = async () => {
      if (!token) {
        setState((prev) => ({ ...prev, loading: false }))
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clientAxios('/usuarios/perfil', config)
        setState((prev) => ({ ...prev, user: data, isAuth: true }))
        navigate('/proyects')
      } catch (error) {
        console.log(error)
      }
      setState((prev) => ({ ...prev, loading: false }))
    }
    authUser()
  }, [token])

  const logout = () => {
    setState(initialState)
  }

  return <AuthContext.Provider value={{ ...state, logout }}>{children}</AuthContext.Provider>
}

export { AuthProvider }

export default AuthContext
