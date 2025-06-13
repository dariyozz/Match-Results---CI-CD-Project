// import React from "react";
// import {Toaster} from "react-hot-toast";
// import {AuthProvider} from "./auth/AuthContext.tsx";
// import {BrowserRouter} from "react-router-dom";
// import App from "./App.tsx";
// import {createRoot} from "react-dom/client";
//
// createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <AuthProvider>
//             <BrowserRouter>
//                 <App/>
//                 <Toaster position="top-right"/>
//             </BrowserRouter>
//         </AuthProvider>
//     </React.StrictMode>
// );
import React from "react";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./auth/AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import {createRoot} from "react-dom/client";
import './index.css'; // Import your global styles

try {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
        throw new Error('Failed to find the root element');
    }

    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter>
                    <App/>
                    <Toaster position="top-right"/>
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
    );
} catch (error) {
    console.error('Failed to render application:', error);
    // Optionally display a fallback UI
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to load application. Please check console for details.</div>';
}