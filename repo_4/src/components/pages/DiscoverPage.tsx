import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Department, DEPARTMENTS } from "@/lib/types";
import { mockUsers } from "@/lib/mock-data";
import { RiMailLine, RiUserAddLine } from "@remixicon/react";

interface DiscoverPageProps {
    currentUser: User;
    onViewProfile?: (user: User) => void;
    onSendMessage?: (userId: string) => void;
}

export function DiscoverPage({
    currentUser,
    onViewProfile,
    onSendMessage,
}: DiscoverPageProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [departmentFilter, setDepartmentFilter] = useState<Department | "all">(
        "all"
    );
    const [yearFilter, setYearFilter] = useState<1 | 2 | 3 | 4 | "all">("all");

    useEffect(() => {
        // In repo_8 this called an async API. Here we use the direct mock export.
        // Simulate async load if needed, but not strictly required.
        const loadUsers = () => {
            let allUsers = mockUsers;
            // Filter out current user
            allUsers = allUsers.filter((u) => u.id !== currentUser.id);
            setUsers(allUsers);
        };
        loadUsers();
    }, [currentUser.id]);

    const filteredUsers = users.filter((user) => {
        const matchesDepartment =
            departmentFilter === "all" || user.department === departmentFilter;

        // Simple year matching - repo_4 uses "3rd Year" string, repo_8 used number.
        // We try to match string containment or exact match if user.year was a number.
        const yearString = String(user.year); // "3rd Year"
        const filterString = yearFilter === "all" ? "all" : `${yearFilter}`;

        // Loose matching: if filter is "3", match "3rd Year"
        const matchesYear = yearFilter === "all" || yearString.includes(filterString);

        return matchesDepartment && matchesYear;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4">
            <div>
                <h1 className="text-3xl font-bold mb-2">Discover Students</h1>
                <p className="text-muted-foreground">Find and connect with students across campus</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center bg-card p-4 rounded-lg border shadow-sm">
                <Select
                    value={departmentFilter}
                    onValueChange={(v) => setDepartmentFilter(v as Department | "all")}
                >
                    <SelectTrigger className="w-full md:w-[240px]">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                                {dept}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={String(yearFilter)}
                    onValueChange={(v) => setYearFilter(v as any)}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                        <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                </Select>

                <Badge variant="secondary" className="ml-auto">
                    {filteredUsers.length} {filteredUsers.length === 1 ? "student" : "students"} found
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => {
                    const initials = user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);

                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary/10">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-primary/5 text-primary text-lg">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">
                                                {user.name}
                                            </h3>
                                            <Badge variant="outline" className="mt-1 font-normal">
                                                {user.department}
                                            </Badge>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {user.year}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-1 flex flex-col">
                                    {user.about && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                            {user.about}
                                        </p>
                                    )}
                                    <div className="flex gap-2 pt-2 mt-auto">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onViewProfile && onViewProfile(user)}
                                            className="flex-1"
                                        >
                                            <RiUserAddLine className="h-4 w-4 mr-1" />
                                            Profile
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => onSendMessage && onSendMessage(user.id)}
                                            className="flex-1"
                                        >
                                            <RiMailLine className="h-4 w-4 mr-1" />
                                            Message
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RiUserAddLine className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No students found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your filters to find more people.
                    </p>
                </div>
            )}
        </div>
    );
}
