import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Student } from '@/types/student';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DiscoverStudentsProps {
  students: Student[];
  onConnect: (studentId: string) => void;
  onSkip: (studentId: string) => void;
}

export function DiscoverStudents({ students, onConnect, onSkip }: DiscoverStudentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const currentStudent = students[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setExitX(direction === 'left' ? -1000 : 1000);
    setTimeout(() => {
      if (direction === 'right' && currentStudent) {
        onConnect(currentStudent.id);
      } else if (currentStudent) {
        onSkip(currentStudent.id);
      }
      setCurrentIndex((prev) => prev + 1);
      setExitX(0);
    }, 200);
  };

  if (!currentStudent || currentIndex >= students.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No more students</h3>
        <p className="text-sm text-muted-foreground">Check back later for new connections!</p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4 pb-24">
      {/* Card Stack Preview */}
      <div className="relative w-full max-w-sm h-[500px]">
        {/* Next card preview */}
        {students[currentIndex + 1] && (
          <div className="absolute inset-0 bg-card rounded-2xl border-2 border-border shadow-lg scale-95 opacity-50" />
        )}

        {/* Current card */}
        <SwipeCard
          student={currentStudent}
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          exitX={exitX}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-6">
        <button
          onClick={() => handleSwipe('left')}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-card border-2 border-border shadow-lg hover:scale-110 transition-transform active:scale-95"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform active:scale-95"
        >
          <Heart className="w-7 h-7" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 text-sm text-muted-foreground">
        {currentIndex + 1} / {students.length}
      </div>
    </div>
  );
}

interface SwipeCardProps {
  student: Student;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  exitX: number;
}

function SwipeCard({ student, onSwipeLeft, onSwipeRight, exitX }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-card rounded-2xl border-2 border-border shadow-xl cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, opacity: 0 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col h-full p-6 overflow-hidden">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-32 h-32 mb-4 ring-4 ring-background">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="text-4xl">{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center">{student.name}</h2>
          <p className="text-muted-foreground text-center">
            {student.department} • Year {student.year}
          </p>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed text-center">{student.bio}</p>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {student.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mutual Connections */}
        {student.mutualConnections && student.mutualConnections > 0 && (
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{student.mutualConnections} mutual connections</span>
            </div>
          </div>
        )}
      </div>

      {/* Swipe indicators */}
      <motion.div
        className="absolute top-8 left-8 px-6 py-3 bg-red-500 text-white font-bold text-xl rounded-lg rotate-[-20deg] opacity-0"
        style={{ opacity: useTransform(x, [-100, -50], [1, 0]) }}
      >
        SKIP
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 px-6 py-3 bg-green-500 text-white font-bold text-xl rounded-lg rotate-[20deg] opacity-0"
        style={{ opacity: useTransform(x, [50, 100], [0, 1]) }}
      >
        CONNECT
      </motion.div>
    </motion.div>
  );
}
