import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step1Props {
    onNext: (data: any) => void;
}

export default function Step1CreateAccount({ onNext }: Step1Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        onNext({ email, password });
    };

    return (
        <div className="bg-[#15161C] border border-white/10 rounded-2xl p-8 mt-20">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white mb-2">Create Account</h1>
                <p className="text-white/60 text-sm">
                    Join your university community and connect with fellow students
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white text-sm font-medium">
                        University Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        required
                        className="h-11 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-white text-sm font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-11 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-11 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full h-11 bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white font-medium rounded-xl"
                >
                    Continue
                </Button>

                <p className="text-center text-white/40 text-xs">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </form>
        </div>
    );
}
