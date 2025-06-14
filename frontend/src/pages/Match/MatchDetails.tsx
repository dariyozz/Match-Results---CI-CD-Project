import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../api/axios.ts";
import Loader from "../../components/Loader.tsx";

interface Match {
    id: number;
    homeTeam: {
        id: number;
        name: string;
        coach: string;
        logoUrl: string;
    };
    awayTeam: {
        id: number;
        name: string;
        coach: string;
        logoUrl: string;
    };
    dateTime: string;
    homeScore: number;
    awayScore: number;
    venue: string;
}

export const MatchDetails = () => {
    const {id} = useParams();
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        api.get(`/matches/${id}`).then(res => setMatch(res.data));
    }, [id]);

    if (!match) return <Loader/>;

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-center flex-1">
                            <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name}
                                 className="w-24 h-24 mx-auto mb-4 object-contain"/>
                            <h2 className="text-xl font-bold text-gray-800">{match.homeTeam.name}</h2>
                            <p className="text-sm text-gray-600">Coach: {match.homeTeam.coach}</p>
                        </div>

                        <div className="mx-8 text-center">
                            <div className="text-4xl font-bold text-gray-800 mb-2">
                                {match.homeScore} - {match.awayScore}
                            </div>
                            <div className="text-sm text-gray-500">
                                {new Date(match.dateTime).toLocaleString()}
                            </div>
                        </div>

                        <div className="text-center flex-1">
                            <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name}
                                 className="w-24 h-24 mx-auto mb-4 object-contain"/>
                            <h2 className="text-xl font-bold text-gray-800">{match.awayTeam.name}</h2>
                            <p className="text-sm text-gray-600">Coach: {match.awayTeam.coach}</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span className="text-lg">{match.venue}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};