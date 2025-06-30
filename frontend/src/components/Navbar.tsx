import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        <nav className="bg-blue-900 text-gray-300 px-6 py-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link
                        to="/matches"
                        className={`transition-colors duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                            ${isActive('/matches') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                    >
                        Matches
                    </Link>
                    <Link
                        to="/teams"
                        className={`transition-colors duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                            ${isActive('/teams') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                    >
                        Teams
                    </Link>
                    <Link
                        to="/players"
                        className={`transition-colors duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                            ${isActive('/players') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                    >
                        Players
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded-md text-sm font-medium text-white
                                transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                    hover:bg-gray-800 hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white
                                    transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2
                                    focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
