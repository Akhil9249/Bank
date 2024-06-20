import './App.css'
import UserLogin from './pages/UserLogin'
import UserDashBoard from './pages/UserDashBoard'
import { Route, Routes } from 'react-router-dom'
import Withdrawal from './pages/Withdrawal'
import Deposit from './pages/Deposit'
import UserRegister from './pages/UserRegister'
import UserProtectedLogRoute from './components/UserProtectedLogRoute'
import UserProtectedRoute from './components/UserProtectedRoute'
import AdminLogin from './pages/AdminLogin'
import AdminDashBoard from './pages/AdminDashBoard'
import AdminRegister from './pages/AdminRegister'
import AdminProtectedLogRoute from './components/AdminProtectedLogRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'

function App() {

  return (
    <>
    
      <Routes >

        <Route element={<UserProtectedLogRoute/>} >
        <Route path="/" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} /> 
        </Route>

        <Route element={<UserProtectedRoute/>}>
        <Route path="/dashboard" element={<UserDashBoard/>} />
        <Route path="/withdrawel" element={<Withdrawal/>} />
        <Route path="/deposit" element={<Deposit/>} />
        </Route>

        <Route element={<AdminProtectedLogRoute/>}>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/register" element={<AdminRegister/>}/>
        </Route>

        <Route element={<AdminProtectedRoute/>}>
        <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
        </Route>
      </Routes >
    </>
  )
}

export default App
