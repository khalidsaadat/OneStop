import './assets/index.css'

import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoutesLayout from './layouts/PrivateRoutesLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()
function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoutesLayout />}>
                        <Route path="/" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
