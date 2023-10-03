import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <Header/>
      <br />
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/accounts/:account/transactions" element={ <Transactions/> } />
      </Routes>
    </div>
  )
}
