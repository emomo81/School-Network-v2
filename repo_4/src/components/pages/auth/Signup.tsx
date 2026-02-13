import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- HELPER COMPONENTS (ICONS) ---



// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
        {children}
    </div>
);

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: 1,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.department) {
            setError('Please select a department');
            setLoading(false);
            return;
        }

        const success = await signup({ ...formData, department: formData.department as any, year: formData.year as any });

        if (success) {
            navigate('/onboarding');
        } else {
            setError('Failed to create account. Please try again.');
        }
        setLoading(false);
    };



    return (
        <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] bg-background text-foreground overflow-x-hidden">
            {/* Left column: sign-up form */}
            <section className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    <div className="flex flex-col gap-6">
                        <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">Create an account</h1>
                        <p className="animate-element animate-delay-200 text-muted-foreground">Join the academic network today</p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {error && (
                                <div className="animate-element animate-delay-300 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
                                    {error}
                                </div>
                            )}

                            <div className="animate-element animate-delay-300">
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <GlassInputWrapper>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-300">
                                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                <GlassInputWrapper>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@student.edu"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-400">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                                            required
                                            minLength={6}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-500">
                                <label className="text-sm font-medium text-muted-foreground">Department</label>
                                <GlassInputWrapper>
                                    <div className="p-1">
                                        <Select
                                            value={formData.department}
                                            onValueChange={(value) => setFormData({ ...formData, department: value })}
                                        >
                                            <SelectTrigger id="department" className="w-full border-none bg-transparent focus:ring-0 text-sm p-3 h-auto shadow-none">
                                                <SelectValue placeholder="Select your department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DEPARTMENTS.map((dept) => (
                                                    <SelectItem key={dept} value={dept}>
                                                        {dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element animate-delay-500">
                                <label className="text-sm font-medium text-muted-foreground">Year</label>
                                <GlassInputWrapper>
                                    <div className="p-1">
                                        <Select
                                            value={formData.year.toString()}
                                            onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}
                                        >
                                            <SelectTrigger id="year" className="w-full border-none bg-transparent focus:ring-0 text-sm p-3 h-auto shadow-none">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1st Year</SelectItem>
                                                <SelectItem value="2">2nd Year</SelectItem>
                                                <SelectItem value="3">3rd Year</SelectItem>
                                                <SelectItem value="4">4th Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <button type="submit" disabled={loading} className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>



                        <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
                            Already have an account? <Link to="/login" className="text-violet-400 hover:underline transition-colors">Sign in</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Right column: hero image */}
            <section className="hidden md:block flex-1 relative p-4 h-screen sticky top-0">
                <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=2160&q=80)` }}></div>
            </section>
        </div>
    );
}

