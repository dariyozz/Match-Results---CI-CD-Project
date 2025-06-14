import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

interface Team {
    id: number;
    name: string;
}

interface FormData {
    name: string;
    position: string;
    number: number;
    dateOfBirth: string;
    teamId: number | string;
}

const POSITIONS = [
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward"
];

const PlayerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editMode = Boolean(id);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<FormData>({
        name: '',
        position: '',
        number: 1,
        dateOfBirth: '',
        teamId: ''
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load teams for the dropdown
                const teamsResponse = await api.get('/teams');
                setTeams(teamsResponse.data);

                // If editing, load player data
                if (editMode) {
                    const playerResponse = await api.get(`/players/${id}`);
                    const player = playerResponse.data;
                    setForm({
                        name: player.name,
                        position: player.position,
                        number: player.number,
                        dateOfBirth: player.dateOfBirth.split('T')[0], // Format date for input
                        teamId: player.teamId || ''
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load data");
                navigate("/players");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [editMode, id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === 'number' ? parseInt(value) || 0 : value;
        setForm(prev => ({ ...prev, [name]: updatedValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (editMode) {
                await api.put(`/players/${id}`, form);
                toast.success("Player updated successfully!");
            } else {
                await api.post("/players", form);
                toast.success("Player created successfully!");
            }
            navigate("/players");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save player");
        }
    };

    const handleDelete = async () => {
        if (!id || !window.confirm("Are you sure you want to delete this player?")) {
            return;
        }

        try {
            await api.delete(`/players/${id}`);
            toast.success("Player deleted successfully!");
            navigate("/players");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete player");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    {editMode ? "Edit Player" : "Create New Player"}
                </h2>
                
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Position
                        </label>
                        <select
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Position</option>
                            {POSITIONS.map(position => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Number
                        </label>
                        <input
                            type="number"
                            name="number"
                            value={form.number}
                            onChange={handleChange}
                            min="1"
                            max="99"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Team
                        </label>
                        <select
                            name="teamId"
                            value={form.teamId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Team (Optional)</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/players")}
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

export default PlayerForm;