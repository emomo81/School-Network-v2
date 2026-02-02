import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, Book, MessageCircle, FileText, Mail } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    faqs: [
      {
        question: "How do I create a professional profile?",
        answer: "Navigate to your profile page by clicking on your avatar in the top right corner. Click 'Edit Profile' to add your headline, about section, experience, skills, and projects. Make sure to upload a professional photo and cover image.",
      },
      {
        question: "What is a verified account?",
        answer: "A verified account indicates that you are an officially enrolled student or faculty member. Verification helps maintain the authenticity of our academic community. Contact your department administrator to verify your account.",
      },
      {
        question: "How do I connect with other students?",
        answer: "Browse the Students page to discover peers across campus. You can filter by department and search by name or interests. Click 'Connect' to send a connection request with an optional personalized message.",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects & Portfolio",
    icon: FileText,
    faqs: [
      {
        question: "How do I showcase my projects?",
        answer: "Go to the Projects page and click 'Upload Project'. Fill in the project details including title, description, tech stack, and upload images. You can also add links to GitHub repositories and live demos.",
      },
      {
        question: "Can I collaborate with others on projects?",
        answer: "Yes! When creating or editing a project, you can add collaborators by searching for their names. Collaborators will appear on the project card with their avatars.",
      },
      {
        question: "How do I get more visibility for my projects?",
        answer: "Projects with more likes and engagement appear in the 'Popular' tab. Share your projects on the feed, use relevant tags, and engage with other students' projects to build visibility.",
      },
    ],
  },
  {
    id: "networking",
    title: "Networking & Connections",
    icon: MessageCircle,
    faqs: [
      {
        question: "What's the difference between connections and followers?",
        answer: "Connections are mutual relationships where both parties accept the connection request. This allows for direct messaging and closer collaboration. The platform currently focuses on mutual connections.",
      },
      {
        question: "How do I message other students?",
        answer: "Go to the Messages page to see all your conversations. You can only message students you're connected with. Click on a conversation to view and send messages.",
      },
      {
        question: "What are study groups?",
        answer: "Study groups are collaborative learning sessions organized by subject or course. Join existing groups or create your own to study with peers who share your academic interests.",
      },
    ],
  },
  {
    id: "events",
    title: "Events & Activities",
    icon: Book,
    faqs: [
      {
        question: "How do I RSVP to events?",
        answer: "Browse the Events page to see upcoming seminars, workshops, career fairs, and competitions. Click 'RSVP' on any event card to register. You'll receive notifications and the event will appear in your calendar.",
      },
      {
        question: "Can I create my own events?",
        answer: "Yes! Click 'Create Event' on the Events page. Fill in details like title, description, date, time, location, and capacity. Your event will be visible to all students on campus.",
      },
      {
        question: "How do I find events in my department?",
        answer: "Use the filter badges on the Events page to filter by event type (seminar, workshop, career-fair, etc.). You can also search for specific topics or departments.",
      },
    ],
  },
  {
    id: "skills",
    title: "Skills & Endorsements",
    icon: Book,
    faqs: [
      {
        question: "What are skill endorsements?",
        answer: "Skill endorsements are recommendations from your connections confirming your proficiency in specific skills. The more endorsements you have, the more credible your skill set appears to mentors and potential collaborators.",
      },
      {
        question: "How do I endorse someone's skills?",
        answer: "Visit their profile and scroll to the Skills section. Click on the skills you can vouch for based on your experience working or studying with them.",
      },
      {
        question: "Can I add new skills to my profile?",
        answer: "Yes! In edit mode on your profile, you can add skills relevant to your field of study and career goals. Focus on both technical and soft skills.",
      },
    ],
  },
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">How can we help you?</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions or reach out to our support team
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <MessageCircle className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">
                Chat with our support team
              </p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <Mail className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help via email
              </p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <Book className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">User Guide</h3>
              <p className="text-sm text-muted-foreground">
                Download full documentation
              </p>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          {filteredCategories.length > 0 ? (
            <div className="space-y-6">
              {filteredCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.id}>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                        <Badge variant="secondary">{category.faqs.length}</Badge>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, idx) => (
                          <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse all categories above
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Still need help?</h3>
            <p className="text-lg opacity-90">
              Our support team is available 24/7 to assist you
            </p>
            <Button size="lg" variant="secondary" className="mt-4">
              Contact Support Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
