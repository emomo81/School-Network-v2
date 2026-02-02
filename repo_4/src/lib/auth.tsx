import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, DEPARTMENTS } from './types';
import { mockUsers, currentUser as defaultUser } from './mock-data';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (data: Partial<User>) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Check against mock users + default user
            const allUsers = [defaultUser, ...mockUsers];
            const foundUser = allUsers.find(u => u.email === email);

            if (foundUser) {
                // In a real app we would check password here
                setUser(foundUser);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const signup = async (data: Partial<User>) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const newUser: User = {
                id: Date.now().toString(),
                email: data.email!,
                name: data.name!,
                department: data.department as any,
                year: (typeof data.year === 'number' ? `${data.year}rd Year` : data.year) as any, // Simple mapping
                faculty: "Technology", // Default for now, should infer from dept
                headline: "Student",
                about: data.bio || '',
                avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
                coverPhoto: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop",
                location: "Campus",
                joinedDate: new Date().toISOString(),
                isVerified: false,
                isMentor: false,
                password: data.password,
            };

            setUser(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            return true;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
