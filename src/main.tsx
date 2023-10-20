import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@assets/css/index.css";
import "virtual:uno.css";
import "nprogress/nprogress.css"
import Message from "@/components/Message";
import {App as AntdApp, ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider>
            <AntdApp>
                <Message/>
                <App/>
            </AntdApp>
        </ConfigProvider>
    </React.StrictMode>
)
