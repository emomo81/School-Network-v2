import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { PostType } from "@/lib/types";
import { RiAddLine, RiCloseLine } from "@remixicon/react";

interface CreatePostProps {
  onCreatePost: (content: string, type: PostType, tags: string[]) => Promise<void>;
}

export function CreatePost({ onCreatePost }: CreatePostProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<PostType>("question");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await onCreatePost(content, type, tags);
      setContent("");
      setTags([]);
      setType("question");
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="p-4 border-navy-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex-1 text-muted-foreground">
              What's on your mind? Share a question, project, or resource...
            </div>
            <Button size="sm" className="bg-secondary hover:bg-blue-400">
              <RiAddLine className="h-4 w-4 mr-1" />
              Post
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Share something with the ULK community
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Post Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as PostType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="project">Project Collaboration</SelectItem>
                <SelectItem value="resource">Resource/Material</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="resize-none border-navy-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 px-3 py-2 border border-navy-200 rounded-md text-sm"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                size="sm"
                variant="outline"
              >
                Add
              </Button>
            </div>
            <AnimatePresence>
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 pl-2 pr-1"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-navy-200 rounded-full p-0.5"
                      >
                        <RiCloseLine className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className="w-full bg-navy-800 hover:bg-navy-600"
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
