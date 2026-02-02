import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, DEPARTMENTS } from './types';
import { supabase } from './supabase';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(mapSupabaseUserToUser(session.user));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(mapSupabaseUserToUser(session.user));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error.message);
                return false;
            }
            return true;
        } catch (err) {
            console.error('Login exception:', err);
            return false;
        }
    };

    const signup = async (data: Partial<User>) => {
        try {
            if (!data.email || !data.password) return false;

            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        name: data.name,
                        department: data.department,
                        year: data.year,
                    }
                }
            });

            if (error) {
                console.error('Signup error:', error.message);
                return false;
            }
            return true;
        } catch (err) {
            console.error('Signup exception:', err);
            return false;
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // Helper to map Supabase Auth user to our User type
    const mapSupabaseUserToUser = (supabaseUser: any): User => {
        const metadata = supabaseUser.user_metadata || {};
        return {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: metadata.name || 'User',
            avatar: metadata.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            coverPhoto: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
            department: metadata.department || DEPARTMENTS[0],
            faculty: 'Faculty of Science & Technology', // Default for now
            year: metadata.year || 'Year 1',
            headline: 'Student at ULK',
            about: '',
            location: 'Kigali, Rwanda',
            joinedDate: new Date(supabaseUser.created_at).toISOString().split('T')[0],
            isVerified: false,
        };
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
