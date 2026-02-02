import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/lib/types";
import { Calendar, Clock, MapPin, Users, MoreVertical, Edit, Trash2 } from "lucide-react";
import AvatarGroup from "@/components/ui/avatar-group";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  currentUserId?: string;
  onRSVP?: (eventId: string) => void;
  isRegistered?: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

export function EventCard({ event, currentUserId, onRSVP, isRegistered = false, onEdit, onDelete }: EventCardProps) {
  const typeColors = {
    seminar: "bg-blue-100 text-blue-700",
    workshop: "bg-purple-100 text-purple-700",
    "career-fair": "bg-green-100 text-green-700",
    networking: "bg-orange-100 text-orange-700",
    competition: "bg-red-100 text-red-700",
  };

  const attendancePercentage = (event.attendees.length / event.capacity) * 100;
  const isOwner = currentUserId === event.organizer.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {event.thumbnail && (
          <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {isOwner && (
              <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(event.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Event
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(event.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )}
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg line-clamp-2 flex-1">{event.title}</h3>
              <Badge variant="secondary" className={typeColors[event.type]}>
                {event.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          </div>

          {/* Event Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-2">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Organized by</p>
              <p className="text-sm font-medium truncate">{event.organizer.name}</p>
            </div>
          </div>

          {/* Attendees */}
          {event.attendees.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {event.attendees.length} / {event.capacity} attending
                </span>
                <span className="text-muted-foreground">{attendancePercentage.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
              <AvatarGroup
                items={event.attendees.map((a, idx) => ({
                  id: idx,
                  name: a.name,
                  designation: "Attendee",
                  image: a.avatar,
                }))}
                maxVisible={5}
                size="sm"
                className="justify-start"
              />
            </div>
          )}

          {/* RSVP Button */}
          <Button
            onClick={() => onRSVP?.(event.id)}
            className="w-full"
            variant={isRegistered ? "outline" : "default"}
          >
            <Users className="w-4 h-4 mr-2" />
            {isRegistered ? "Registered" : "RSVP"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
