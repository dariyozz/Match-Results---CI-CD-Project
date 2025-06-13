import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from "../../api/axios";
import Loader from "../../components/Loader";

interface PlayerDto {
    id: number;
    name: string;
    position: string;
    number: number;
    dateOfBirth: string;
    teamId: number;
}

interface Team {
    id: number;
    name: string;
    coachName: string;
    logoUrl: string;
}

const positionColors: Record<string, { bg: string; text: string; border: string }> = {
    'Goalkeeper': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    'Defender': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'Midfielder': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    'Forward': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const PlayerCard = ({ player }: { player: PlayerDto }) => (
    <div className="flex flex-col items-center group">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white
            bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-110 transition-transform
            duration-200 relative`}>
            <span className="text-lg font-bold">#{player.number}</span>
        </div>
        <div className="mt-2 text-center">
            <p className="font-semibold text-gray-800 text-sm">{player.name}</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1
                ${positionColors[player.position]?.bg} 
                ${positionColors[player.position]?.text}`}>
                {player.position}
            </span>
        </div>
    </div>
);

const TeamSquad = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState<PlayerDto[]>([]);
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playersRes, teamRes] = await Promise.all([
                    api.get(`/players/team/${id}`),
                    api.get(`/teams/${id}`)
                ]);
                setPlayers(playersRes.data);
                setTeam(teamRes.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load team data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading || !team) return <Loader />;

    // Organize players by position
    const goalkeeper = players.find(p => p.position === 'Goalkeeper');
    const defenders = players.filter(p => p.position === 'Defender').slice(0, 4);
    const midfielders = players.filter(p => p.position === 'Midfielder').slice(0, 4);
    const forwards = players.filter(p => p.position === 'Forward').slice(0, 2);
    
    // Get substitutes (players not in the starting 11)
    const starters = [
        goalkeeper,
        ...defenders,
        ...midfielders,
        ...forwards
    ].filter(Boolean);
    
    const substitutes = players.filter(p => !starters.find(s => s?.id === p.id));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Team Header */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={team.logoUrl || '/default-team-logo.png'}
                            alt={team.name}
                            className="w-24 h-24 object-contain"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
                            <p className="text-gray-600 mt-2">Coach: {team.coachName}</p>
                        </div>
                    </div>
                </div>

                {/* Formation Display */}
                <div className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 mb-8 min-h-[600px]">
                    {/* Field markings */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 transform -translate-y-1/2" />
                        <div className="absolute left-0 right-0 h-[150px] border-2 border-white/20 top-0 mx-8" />
                        <div className="absolute left-0 right-0 h-[150px] border-2 border-white/20 bottom-0 mx-8" />
                    </div>

                    {/* Players Formation */}
                    <div className="relative h-full flex flex-col justify-between">
                        {/* Forwards */}
                        <div className="flex justify-center gap-32 mb-20">
                            {forwards.map(player => player && (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>

                        {/* Midfielders */}
                        <div className="flex justify-around mb-20">
                            {midfielders.map(player => player && (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>

                        {/* Defenders */}
                        <div className="flex justify-around mb-20">
                            {defenders.map(player => player && (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>

                        {/* Goalkeeper */}
                        <div className="flex justify-center">
                            {goalkeeper && <PlayerCard player={goalkeeper} />}
                        </div>
                    </div>
                </div>

                {/* Substitutes */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Substitutes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {substitutes.map(player => (
                            <div key={player.id} 
                                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                                <PlayerCard player={player} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSquad;