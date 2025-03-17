import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import type { Comment } from "../../types/types";

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comment: any) => void;
  initialData: Comment | null;
}

export default function CommentDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: CommentDialogProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    postId: initialData?.postId || 1,
    name: initialData?.name || "",
    email: initialData?.email || "",
    body: initialData?.body || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        postId: initialData.postId,
        name: initialData.name,
        email: initialData.email,
        body: initialData.body,
      });
    } else {
      // Reset form when adding a new comment
      setFormData({
        id: 0,
        postId: 1,
        name: "",
        email: "",
        body: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      body: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.body.trim()) {
      newErrors.body = "Comment body is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      // Dialog will be closed by the parent component after submission
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Edit Comment" : "Add New Comment"}
          </DialogTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Comment</Label>
            <Textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your comment here..."
              rows={4}
              className={errors.body ? "border-red-500" : ""}
            />
            {errors.body && (
              <p className="text-sm text-red-500">{errors.body}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              {initialData ? "Update Comment" : "Add Comment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
