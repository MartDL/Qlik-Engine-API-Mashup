import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Dashboard from '../pages/Dashboard'


const AppRouter = () => (
    <React.StrictMode>
        <BrowserRouter>
            <Route Exact path="/" component={Dashboard} />
        </BrowserRouter>
  </React.StrictMode>
)

export default AppRouter;
     