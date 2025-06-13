import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from "../../api/axios";
import Loader from "../../components/Loader";
import { Link } from 'react-router-dom';

interface Player {
    id: number;
    name: string;
    position: string;
    number: number;
    dateOfBirth: string;
    teamId: number;
    team?: {
        name: string;
        logoUrl: string;
    };
}

const positionColors: Record<string, { bg: string; text: string }> = {
    'Goalkeeper': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'Defender': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Midfielder': { bg: 'bg-green-100', text: 'text-green-800' },
    'Forward': { bg: 'bg-red-100', text: 'text-red-800' },
};

const PlayerList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/players');
            setPlayers(response.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load players');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this player?')) return;
        try {
            await api.delete(`/players/${id}`);
            toast.success('Player deleted successfully');
            fetchPlayers();
        } catch {
            toast.error('Failed to delete player');
        }
    };

    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = !selectedPosition || player.position === selectedPosition;
        return matchesSearch && matchesPosition;
    });

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">Squad</h2>
                    <Link
                        to="/players/new"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700
                            transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Player
                    </Link>
                </div>

                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 
                                focus:border-transparent transition-all duration-200"
                        />
                        <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 
                            focus:border-transparent transition-all duration-200"
                    >
                        <option value="">All Positions</option>
                        {Object.keys(positionColors).map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                        ))}
                    </select>
                </div>

                {filteredPlayers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No players found</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new player.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPlayers.map(player => (
                            <div key={player.id} 
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                                    transform hover:-translate-y-1 overflow-hidden">
                                <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
                                    <div className="absolute inset-0 bg-black opacity-10"></div>
                                    {player.team?.logoUrl && (
                                        <img
                                            src={player.team.logoUrl}
                                            alt={player.team.name}
                                            className="absolute right-4 top-4 w-16 h-16 object-contain opacity-50"
                                        />
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-4xl font-bold text-white">#{player.number}</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                                ${positionColors[player.position]?.bg} ${positionColors[player.position]?.text}`}>
                                                {player.position}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                Age: {calculateAge(player.dateOfBirth)}
                                            </p>
                                        </div>
                                        {player.team && (
                                            <span className="text-sm text-gray-500">{player.team.name}</span>
                                        )}
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <Link
                                            to={`/players/edit/${player.id}`}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(player.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerList;