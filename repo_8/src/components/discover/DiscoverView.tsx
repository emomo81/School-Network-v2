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
import { User, Department } from "@/lib/types";
import { DEPARTMENTS } from "@/lib/types";
import { mockUsers } from "@/lib/mockApi";
import { RiMailLine, RiUserAddLine } from "@remixicon/react";

interface DiscoverViewProps {
  currentUser: User;
  onViewProfile: (user: User) => void;
  onSendMessage: (userId: string) => void;
}

export function DiscoverView({
  currentUser,
  onViewProfile,
  onSendMessage,
}: DiscoverViewProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<Department | "all">(
    "all"
  );
  const [yearFilter, setYearFilter] = useState<1 | 2 | 3 | 4 | "all">("all");

  useEffect(() => {
    const loadUsers = async () => {
      let allUsers = await mockUsers.getAll();
      // Filter out current user
      allUsers = allUsers.filter((u) => u.id !== currentUser.id);
      setUsers(allUsers);
    };
    loadUsers();
  }, [currentUser.id]);

  const filteredUsers = users.filter((user) => {
    const matchesDepartment =
      departmentFilter === "all" || user.department === departmentFilter;
    const matchesYear = yearFilter === "all" || user.year === yearFilter;
    return matchesDepartment && matchesYear;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex gap-3 items-center">
        <Select
          value={departmentFilter}
          onValueChange={(v) => setDepartmentFilter(v as Department | "all")}
        >
          <SelectTrigger className="w-[240px]">
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
          onValueChange={(v) => setYearFilter(v as 1 | 2 | 3 | 4 | "all")}
        >
          <SelectTrigger className="w-[180px]">
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

        <Badge variant="outline" className="ml-auto">
          {filteredUsers.length} {filteredUsers.length === 1 ? "student" : "students"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-navy-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-navy-200">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-secondary text-white text-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy-800">
                        {user.name}
                      </h3>
                      <Badge variant="outline" className="mt-1">
                        {user.department}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Year {user.year}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.bio && (
                    <p className="text-sm text-navy-600 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                  {user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {user.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-accent/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewProfile(user)}
                      className="flex-1"
                    >
                      <RiUserAddLine className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onSendMessage(user.id)}
                      className="flex-1 bg-secondary hover:bg-blue-400"
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No students found. Try adjusting your filters.
          </p>
        </div>
      )}
    </motion.div>
  );
}
