import './assets/index.css'

import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoutesLayout from './layouts/PrivateRoutesLayout'
import Login from './pages/Login'
import Report from './pages/Report'
import Appointment from './pages/Appointment'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()
function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/reports" element={<Report />} />
                    <Route path="/appointment" element={<Appointment />} />
                    {/* <Route element={<PrivateRoutesLayout />}>
                        <Route path="/" element={<Dashboard />} />
                    </Route> */}
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
