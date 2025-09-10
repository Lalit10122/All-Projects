import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

const App = () => {
  const authUser = false;
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/logIn" />} />
        <Route path='/signUp' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/logIn' element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={< SettingPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/logIn" />} />


      </Routes>
    </div>
  )
}

export default App
