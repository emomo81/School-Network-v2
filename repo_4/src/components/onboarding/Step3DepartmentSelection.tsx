import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Step3Props {
    onNext: (data: any) => void;
}

const departments = [
    {
        id: 'Software Engineering',
        name: 'Software Engineering',
        color: '#1C8AF8',
        icon: '💻',
        description: 'Build the future with code',
    },
    {
        id: 'Data Science',
        name: 'Data Science',
        color: '#A855F7',
        icon: '📊',
        description: 'Unlock insights from data',
    },
    {
        id: 'Accounting',
        name: 'Accounting',
        color: '#10B981',
        icon: '💰',
        description: 'Master financial systems',
    },
    {
        id: 'Marketing', // Note: Not in repo_4 types standard but keeping from repo_7
        name: 'Marketing',
        color: '#F59E0B',
        icon: '📢',
        description: 'Connect brands with people',
    },
    {
        id: 'Business Administration', // repo_4 uses "Administrative Sciences"?
        name: 'Business Administration',
        color: '#EF4444',
        icon: '💼',
        description: 'Lead organizations to success',
    },
    {
        id: 'Psychology', // Not in repo_4
        name: 'Psychology',
        color: '#EC4899',
        icon: '🧠',
        description: 'Understand human behavior',
    },
    {
        id: 'Nursing', // Not in repo_4
        name: 'Nursing',
        color: '#06B6D4',
        icon: '🏥',
        description: 'Care for those in need',
    },
    {
        id: 'Sciences/Languages in Education',
        name: 'Education',
        color: '#8B5CF6',
        icon: '📚',
        description: 'Shape future generations',
    },
];

export default function Step3DepartmentSelection({ onNext }: Step3Props) {
    const [selectedDept, setSelectedDept] = useState('');

    const handleSubmit = () => {
        if (!selectedDept) {
            alert('Please select a department');
            return;
        }
        // const dept = departments.find((d) => d.id === selectedDept);
        // Use the exact ID which matches the Department type (mostly)
        onNext({ department: selectedDept });
    };

    return (
        <div className="bg-[#15161C] border border-white/10 rounded-2xl p-8 mt-20">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white mb-2">
                    Choose Your Department
                </h1>
                <p className="text-white/60 text-sm">
                    This will help us personalize your feed and connect you with the right people
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {departments.map((dept) => (
                    <motion.button
                        key={dept.id}
                        type="button"
                        onClick={() => setSelectedDept(dept.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedDept === dept.id
                                ? 'border-[#1C8AF8] bg-[#1C8AF8]/10'
                                : 'border-white/10 bg-[#0F1012] hover:border-white/20'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                                style={{ backgroundColor: `${dept.color}20` }}
                            >
                                {dept.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium text-sm mb-1 truncate">
                                    {dept.name}
                                </h3>
                                <p className="text-white/50 text-xs leading-tight">
                                    {dept.description}
                                </p>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            <Button
                onClick={handleSubmit}
                className="w-full h-11 bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white font-medium rounded-xl"
            >
                Get Started
            </Button>
        </div>
    );
}
