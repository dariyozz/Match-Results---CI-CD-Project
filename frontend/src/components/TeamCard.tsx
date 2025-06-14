import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

interface Team {
    id: number;
    name: string;
    coachName: string;
    logoUrl?: string;
}

const TeamCard = ({ team, refetch }: { team: Team; refetch: () => void }) => {
    const handleDelete = async () => {
        if (confirm(`Delete team ${team.name}?`)) {
            await api.delete(`/teams/${team.id}`);
            toast.success("Team deleted");
            refetch();
        }
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center mb-4">
            <div>
                <h3 className="text-lg font-semibold">{team.name}</h3>
                <p className="text-gray-600">Coach: {team.coachName}</p>
            </div>
            <div className="space-x-2">
                <Link to={`/teams/edit/${team.id}`} className="btn-secondary">Edit</Link>
                <button onClick={handleDelete} className="btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default TeamCard;
