import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import AuthForm from './AuthForm'
import Cereals from './Cereals'

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Auth</NavLink>
        <NavLink to="cereals">Cereals</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="cereals" element={<Cereals />} />
      </Routes>
    </>
  )
}
