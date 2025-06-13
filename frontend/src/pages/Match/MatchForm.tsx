import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

interface TeamDto {
    id: number;
    name: string;
    coachName: string;
    logoUrl: string;
}

interface MatchFormData {
    homeTeam: TeamDto;
    awayTeam: TeamDto;
    dateTime: string;
    homeScore: number;
    awayScore: number;
    venue: string;
    status: string;
}

const MatchForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const editMode = Boolean(id);
    const [teams, setTeams] = useState<TeamDto[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<MatchFormData>({
        homeTeam: {} as TeamDto,
        awayTeam: {} as TeamDto,
        dateTime: '',
        homeScore: 0,
        awayScore: 0,
        venue: '',
        status: 'scheduled'.toUpperCase()
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const teamsResponse = await api.get('/teams');
                setTeams(teamsResponse.data);

                if (editMode) {
                    const matchResponse = await api.get(`/matches/${id}`);
                    const match = matchResponse.data;
                    setForm({
                        homeTeam: match.homeTeam,
                        awayTeam: match.awayTeam,
                        dateTime: match.dateTime.slice(0, 16),
                        homeScore: match.homeScore,
                        awayScore: match.awayScore,
                        venue: match.venue,
                        status: match.status
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load data");
                navigate("/matches");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [editMode, id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        if (name === 'homeTeamId' || name === 'awayTeamId') {
            const selectedTeam = teams.find(team => team.id === parseInt(value));
            if (selectedTeam) {
                setForm(prev => ({
                    ...prev,
                    [name === 'homeTeamId' ? 'homeTeam' : 'awayTeam']: selectedTeam
                }));
            }
        } else {
            const updatedValue = type === 'number' ? parseInt(value) || 0 : value;
            setForm(prev => ({...prev, [name]: updatedValue}));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(form);

        if (form.homeTeam.id === form.awayTeam.id) {
            toast.error("Home team and away team cannot be the same");
            return;
        }

        try {
            const matchData = {
                ...form,
                homeTeam: {id: form.homeTeam.id},
                awayTeam: {id: form.awayTeam.id}
            };

            if (editMode) {
                await api.put(`/matches/${id}`, matchData);
                toast.success("Match updated successfully!");
            } else {
                await api.post("/matches", matchData);
                toast.success("Match created successfully!");
            }
            navigate("/matches");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save match");
        }
    };

    if (loading) return <Loader/>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    {editMode ? "Edit Match" : "Create New Match"}
                </h2>

                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Home Team
                            </label>
                            <select
                                name="homeTeamId"
                                value={form.homeTeam.id || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Home Team</option>
                                {teams.map(team => (
                                    <option
                                        key={`home-${team.id}`}
                                        value={team.id}
                                        disabled={team.id === form.awayTeam.id}
                                    >
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Away Team
                            </label>
                            <select
                                name="awayTeamId"
                                value={form.awayTeam.id || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Away Team</option>
                                {teams.map(team => (
                                    <option
                                        key={`away-${team.id}`}
                                        value={team.id}
                                        disabled={team.id === form.homeTeam.id}
                                    >
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Home Score
                            </label>
                            <input
                                type="number"
                                name="homeScore"
                                value={form.homeScore}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Away Score
                            </label>
                            <input
                                type="number"
                                name="awayScore"
                                value={form.awayScore}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Venue
                        </label>
                        <input
                            type="text"
                            name="venue"
                            value={form.venue}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={form.dateTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="SCHEDULED">Scheduled</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/matches")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                        >
                            {editMode ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MatchForm;