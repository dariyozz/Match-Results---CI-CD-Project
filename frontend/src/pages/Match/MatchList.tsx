import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import api from "../../api/axios";
import Loader from "../../components/Loader";
import {Link, useNavigate} from 'react-router-dom';

interface TeamDto {
    id: number;
    name: string;
    coachName: string;
    logoUrl: string;
}

interface Match {
    id: number;
    homeTeam: TeamDto;
    awayTeam: TeamDto;
    dateTime: string;
    homeScore: number;
    awayScore: number;
    venue: string;
    status: string;
}

const formatMatchDate = (date: string): string => {
    return new Date(date).toLocaleString();
};

const isMatchLive = (matchDateTime: string, status: string): boolean => {
    if (status.toLowerCase() !== 'scheduled') {
        return false;
    }


    const matchTime = new Date(matchDateTime).getTime();
    const currentTime = new Date().getTime();
    const matchEndTime = matchTime + (90 * 60 * 1000); // Match time + 90 minutes in milliseconds

    return currentTime >= matchTime && currentTime <= matchEndTime;
};

const MatchList = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const navigate = useNavigate();

    const fetchMatches = async (status?: string) => {
        try {
            setLoading(true);
            const response = await api.get(status && status !== 'all'
                ? `/matches/status/${status}`
                : '/matches'
            );
            setMatches(response.data);
        } catch (err) {
            console.log(err)
            toast.error('Failed to load matches');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMatches(selectedStatus);
    }, [selectedStatus]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this match?')) {
            return;
        }

        try {
            await api.delete(`/matches/${id}`);
            toast.success('Match deleted successfully');
            fetchMatches();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete match');
        }
    };

    if (loading) return <Loader/>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">Matches</h2>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Matches</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <Link
                    to="/matches/new"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700
                        transition-colors duration-200 font-medium flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    New Match
                </Link>
            </div>

            {matches.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-600">No matches found</h3>
                    <p className="text-gray-500 mt-2">Create a new match to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map(match => (
                        <div key={match.id}
                             className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
                            {isMatchLive(match.dateTime, match.status) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse">
                                    <div className="absolute inset-0 bg-red-600 rounded-full animate-ping"></div>
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                        match.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {match.status.toUpperCase()}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/matches/edit/${match.id}`)}
                                            className="text-yellow-600 hover:text-yellow-700"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(match.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-center flex-1">
                                        <img
                                            src={match.homeTeam.logoUrl || '/default-team-logo.png'}
                                            alt={match.homeTeam.name}
                                            className="w-16 h-16 mx-auto mb-2 object-contain"
                                        />
                                        <h3 className="font-semibold text-gray-900">{match.homeTeam.name}</h3>
                                    </div>

                                    <div className="flex items-center gap-3 px-4">
                                        <span className="text-2xl font-bold text-gray-900">{match.homeScore}</span>
                                        <span className="text-xl text-gray-400">-</span>
                                        <span className="text-2xl font-bold text-gray-900">{match.awayScore}</span>
                                    </div>

                                    <div className="text-center flex-1">
                                        <img
                                            src={match.awayTeam.logoUrl || '/default-team-logo.png'}
                                            alt={match.awayTeam.name}
                                            className="w-16 h-16 mx-auto mb-2 object-contain"
                                        />
                                        <h3 className="font-semibold text-gray-900">{match.awayTeam.name}</h3>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                    <div>
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        {match.venue}
                                    </div>
                                    <div>{formatMatchDate(match.dateTime)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchList;