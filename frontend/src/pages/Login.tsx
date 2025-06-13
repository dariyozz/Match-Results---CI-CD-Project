import React, {useState} from "react";
import {useAuth} from "../auth/AuthContext";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {username, password});
            login(res.data);
            toast("Logged in successfully");
            navigate("/matches");
        } catch {
            toast("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-xl font-bold">Login</h1>
            <input className="w-full border p-2" value={username} onChange={e => setUsername(e.target.value)}
                   placeholder="Username"/>
            <input className="w-full border p-2" value={password} onChange={e => setPassword(e.target.value)}
                   type="password" placeholder="Password"/>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
                Login
            </button>

        </form>
    );
};

export default Login;
