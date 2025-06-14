import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthPayload {
    token: string;
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    token: string | null;
    user: { username: string; email: string } | null;
    roles: string[];
    login: (payload: AuthPayload) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const TOKEN_STORAGE_KEY = "auth-token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem(TOKEN_STORAGE_KEY)
    );
    const [user, setUser] = useState<{ username: string; email: string } | null>(
        () => {
            const username = localStorage.getItem("auth-username");
            const email = localStorage.getItem("auth-email");
            return username && email ? { username, email } : null;
        }
    );
    const [roles, setRoles] = useState<string[]>(() => {
        const role = localStorage.getItem("auth-role");
        return role ? [role] : [];
    });

    const login = (payload: AuthPayload) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, payload.token);
        localStorage.setItem("auth-username", payload.username);
        localStorage.setItem("auth-email", payload.email);
        localStorage.setItem("auth-role", payload.role);

        setToken(payload.token);
        setUser({ username: payload.username, email: payload.email });
        setRoles([payload.role]);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem("auth-username");
        localStorage.removeItem("auth-email");
        localStorage.removeItem("auth-role");

        setToken(null);
        setUser(null);
        setRoles([]);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{ token, user, roles, login, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
