import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

interface Player {
    id: number;
    name: string;
    position: string;
    number: number;
    teamName?: string;
}

const PlayerCard = ({ player, refetch }: { player: Player; refetch: () => void }) => {
    const handleDelete = async () => {
        if (confirm(`Delete player ${player.name}?`)) {
            await api.delete(`/players/${player.id}`);
            toast.success("Player deleted");
            refetch();
        }
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center mb-4">
            <div>
                <h3 className="text-lg font-semibold">{player.name} #{player.number}</h3>
                <p className="text-gray-600">{player.position} – {player.teamName}</p>
            </div>
            <div className="space-x-2">
                <Link to={`/players/edit/${player.id}`} className="btn-secondary">Edit</Link>
                <button onClick={handleDelete} className="btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default PlayerCard;
