import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event, Department } from "@/lib/types";
import { Calendar, Filter, Search, Plus } from "lucide-react";
import { toast } from "sonner";

interface EventsPageProps {
  events: Event[];
  currentUserId?: string;
  onEditEvent?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export function EventsPage({ events, currentUserId, onEditEvent, onDeleteEvent }: EventsPageProps) {
  const [localEvents, setLocalEvents] = useState(events);
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const handleRSVP = (eventId: string) => {
    setRegisteredEventIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
        toast.info("RSVP cancelled");
      } else {
        newSet.add(eventId);
        toast.success("RSVP confirmed!");
      }
      return newSet;
    });
  };

  // Filter events
  const filteredEvents = localEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < now);

  const eventTypes = ["all", "seminar", "workshop", "career-fair", "networking", "competition"];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="w-8 h-8" />
              Events
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover and join campus events
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {eventTypes.map(type => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedType(type)}
              >
                {type.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    currentUserId={currentUserId}
                    onRSVP={handleRSVP}
                    isRegistered={registeredEventIds.has(event.id)}
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedType !== "all"
                    ? "Try adjusting your filters"
                    : "Check back later for new events"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    currentUserId={currentUserId}
                    onRSVP={handleRSVP}
                    isRegistered={registeredEventIds.has(event.id)}
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past events</h3>
                <p className="text-muted-foreground">Past events will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
