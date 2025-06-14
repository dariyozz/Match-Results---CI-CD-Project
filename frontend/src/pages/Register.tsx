import React, {useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [form, setForm] = useState({username: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            toast.error("Username and password are required");
            return;
        }

        try {
            await api.post("/auth/register", form);
            toast.success("Registered successfully");
            navigate("/login");
        } catch {
            toast.error("Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-xl font-bold">Register</h1>
            <input className="w-full border p-2" name="username" onChange={handleChange} placeholder="Username"/>
            <input className="w-full border p-2" name="password" type="password" onChange={handleChange}
                   placeholder="Password"/>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
                Register
            </button>

        </form>
    );
};

export default Register;
