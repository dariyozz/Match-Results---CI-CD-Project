import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

interface FormData {
    name: string;
    coachName: string;
    logoUrl: string;
}

const TeamForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const editMode = Boolean(id);
    const [loading, setLoading] = useState(editMode);

    const [form, setForm] = useState<FormData>({
        name: '',
        coachName: '',
        logoUrl: ''
    });

    useEffect(() => {
        if (editMode) {
            api.get(`/teams/${id}`)
                .then(res => setForm(res.data))
                .catch(() => {
                    toast.error("Failed to load team");
                    navigate("/teams");
                })
                .finally(() => setLoading(false));
        }
    }, [editMode, id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.name || !form.coachName) {
            toast.error("Name and coach name are required");
            return;
        }

        try {
            if (editMode) {
                await api.put(`/teams/${id}`, form);
                toast.success("Team updated successfully!");
            } else {
                await api.post("/teams", form);
                toast.success("Team created successfully!");
            }
            navigate("/teams");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save team");
        }
    };

    const handleDelete = async () => {
        if (!id || !window.confirm("Are you sure you want to delete this team?")) {
            return;
        }

        try {
            await api.delete(`/teams/${id}`);
            toast.success("Team deleted successfully!");
            navigate("/teams");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete team");
        }
    };

    if (loading) return <Loader/>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    {editMode ? "Edit Team" : "Create New Team"}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Team Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter team name"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Coach Name
                        </label>
                        <input
                            type="text"
                            name="coachName"
                            value={form.coachName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter coach name"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Logo URL
                        </label>
                        <input
                            type="url"
                            name="logoUrl"
                            value={form.logoUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter logo URL"
                        />
                    </div>

                    {form.logoUrl && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Logo Preview
                            </label>
                            <img
                                src={form.logoUrl}
                                alt="Team Logo Preview"
                                className="w-32 h-32 object-contain border rounded-lg"
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.src = '/default-team-logo.png';
                                }}
                            />
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/teams")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>

                        <div className="flex gap-4">
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                            >
                                {editMode ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamForm;