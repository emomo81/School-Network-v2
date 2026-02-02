import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const features = [
    { icon: Heart, title: 'Swipe to Connect', description: 'Discover and connect with fellow students' },
    { icon: MessageCircle, title: 'Real-time Chat', description: 'Message your connections instantly' },
    { icon: Users, title: 'Study Groups', description: 'Form groups and collaborate on projects' },
    { icon: Sparkles, title: 'Share Posts', description: 'Ask questions, share projects, and more' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-b from-primary/5 to-transparent"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      <h1 className="text-3xl font-bold mb-2">Campus Connect</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Your mobile-first student community platform
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex flex-col items-center p-4 bg-card rounded-lg border border-border"
            >
              <Icon className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <Button onClick={onGetStarted} size="lg" className="w-full max-w-xs">
        Get Started
      </Button>
    </motion.div>
  );
}
