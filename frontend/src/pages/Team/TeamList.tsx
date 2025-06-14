import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import api from "../../api/axios";
import Loader from "../../components/Loader";
import {Link} from 'react-router-dom';

interface Team {
    id: number;
    name: string;
    coachName: string;
    logoUrl: string;
}

const TeamList = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTeams = async () => {
        try {
            setLoading(true);
            const response = await api.get('/teams');
            setTeams(response.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load teams');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this team?')) return;
        try {
            await api.delete(`/teams/${id}`);
            toast.success('Team deleted successfully');
            fetchTeams();
        } catch {
            toast.error('Failed to delete team');
        }
    };

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader/>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900">Teams</h2>
                        <p className="mt-2 text-gray-600">Manage your football teams</p>
                    </div>
                    <Link
                        to="/teams/new"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg
                            hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105
                            shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Add Team
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mb-8">
                    <input
                        type="text"
                        placeholder="Search teams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 
                            focus:border-transparent transition-all duration-200 shadow-sm pl-11"
                    />
                    <svg
                        className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>

                {/* Teams Grid */}
                {filteredTeams.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
                            <div
                                className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">No teams found</h3>
                            <p className="mt-2 text-gray-500">Get started by creating your first team.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeams.map(team => (
                            <div key={team.id}
                                 className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300
                                    transform hover:-translate-y-1 overflow-hidden group">
                                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                    <div className="absolute inset-0 bg-black opacity-10"></div>
                                    <img
                                        src={team.logoUrl || '/default-team-logo.png'}
                                        alt={team.name}
                                        className="absolute right-6 top-6 w-24 h-24 object-contain 
                                            bg-white rounded-xl p-2 shadow-lg transform group-hover:scale-105 
                                            transition-transform duration-300"
                                    />
                                    <div className="relative z-10 mt-14">
                                        <h3 className="text-2xl font-bold text-white truncate">{team.name}</h3>
                                        <div className="flex items-center mt-2">
                                            <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                            <span className="ml-2 text-blue-100">Coach: {team.coachName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/teams/team/${team.id}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Squad →
                                        </Link>
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/teams/edit/${team.id}`}
                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg 
                                                    transition-colors duration-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(team.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg 
                                                    transition-colors duration-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                            </button>
                                        </div>
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

export default TeamList;