import {Routes,Route} from 'react-router-dom'
import { logout } from "../firebase";

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/chats" element={<Chats/>} />
          </Routes>
          <button onClick={logout}>Logout</button>
        </AuthProvider>
    </div>
  )
}

export default App