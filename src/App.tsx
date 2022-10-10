import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProyectsProvider } from './context/ProyectsProvider'
import AuthLayout from './layout/AuthLayout'
import ProtectedRoute from './layout/ProtectedRoute'
import ConfirmAccount from './pages/auth/ConfirmAccount'
import ForgetPassword from './pages/auth/ForgetPassword'
import Login from './pages/auth/Login'
import NewPassword from './pages/auth/NewPassword'
import Register from './pages/auth/Register'
import EditProyect from './pages/home/EditProyect'
import NewCollaborator from './pages/home/NewCollaborator'
import NewProyect from './pages/home/NewProyect'
import Proyect from './pages/home/Proyect'
import Proyects from './pages/home/Proyects'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forget-password' element={<ForgetPassword />} />
              <Route path='forget-password/:token' element={<NewPassword />} />
              <Route path='confirm/:id' element={<ConfirmAccount />} />
            </Route>
          </Routes>
          <Routes>
            <Route path='/proyects' element={<ProtectedRoute />}>
              <Route index element={<Proyects />} />
              <Route path='create-proyect' element={<NewProyect />} />
              <Route
                path='new-collaborator/:id'
                element={<NewCollaborator />}
              />
              <Route path=':id' element={<Proyect />} />
              <Route path='edit/:id' element={<EditProyect />} />
            </Route>
          </Routes>
        </ProyectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
