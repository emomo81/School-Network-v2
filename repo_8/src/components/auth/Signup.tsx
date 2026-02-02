import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEPARTMENTS, Department } from "@/lib/types";

interface SignupProps {
  onSignup: (
    email: string,
    password: string,
    name: string,
    department: Department,
    year: 1 | 2 | 3 | 4
  ) => Promise<void>;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "" as Department,
    year: 1 as 1 | 2 | 3 | 4,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.department) {
      setError("Please select a department");
      return;
    }

    setIsLoading(true);
    try {
      await onSignup(
        formData.email,
        formData.password,
        formData.name,
        formData.department,
        formData.year
      );
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-navy-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy-800">
            Join ULK Network
          </CardTitle>
          <CardDescription>
            Connect with students across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean Claude Mugabo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="border-navy-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@ulk.ac.rw"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="border-navy-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="border-navy-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value as Department })
                }
              >
                <SelectTrigger className="border-navy-200">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Select
                value={String(formData.year)}
                onValueChange={(value) =>
                  setFormData({ ...formData, year: Number(value) as 1 | 2 | 3 | 4 })
                }
              >
                <SelectTrigger className="border-navy-200">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-navy-800 hover:bg-navy-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={onSwitchToLogin}
              className="text-secondary hover:underline font-medium"
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
