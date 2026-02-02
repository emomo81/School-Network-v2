import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS } from '@/types';
import { Search } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function StudentDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, departmentFilter, yearFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by department
    if (departmentFilter !== 'All Departments') {
      filtered = filtered.filter(user => user.department === departmentFilter);
    }

    // Filter by year
    if (yearFilter !== 'all') {
      filtered = filtered.filter(user => user.year === parseInt(yearFilter));
    }

    setFilteredUsers(filtered);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Student Directory</h1>
          <p className="text-gray-600 mt-1">Connect with your peers</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'student' : 'students'}
        </div>

        {/* Students Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading students...</div>
        ) : filteredUsers.length === 0 ? (
          <Card className="border shadow-sm">
            <CardContent className="py-12 text-center text-gray-500">
              No students found matching your criteria
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <Link key={user.id} to={`/profile/${user.id}`}>
                <Card className="border shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate hover:text-blue-600 transition-colors">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{user.department}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Year {user.year}
                          </Badge>
                        </div>
                        
                        {user.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {user.bio}
                          </p>
                        )}
                        
                        {user.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {user.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
