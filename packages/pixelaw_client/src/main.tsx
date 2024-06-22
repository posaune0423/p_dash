import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import {BrowserRouter} from 'react-router-dom';
import {PixelawProvider} from "@/providers/PixelawProvider.tsx";

console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PixelawProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PixelawProvider>
    </React.StrictMode>,
)
