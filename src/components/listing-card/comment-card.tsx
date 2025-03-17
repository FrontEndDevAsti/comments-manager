import { useState } from "react";
import { Edit2, Trash2, Mail, MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import type { Comment } from "../../types/types";

interface CommentCardProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onDelete: (id: number) => void;
}

export default function CommentCard({
  comment,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Generate a deterministic color based on the comment's email
  const getColorFromEmail = (email: string) => {
    const colors = [
      "from-pink-500 to-rose-500",
      "from-orange-500 to-amber-500",
      "from-green-500 to-emerald-500",
      "from-blue-500 to-indigo-500",
      "from-purple-500 to-violet-500",
      "from-teal-500 to-cyan-500",
    ];

    // Simple hash function to get a consistent index
    const hash = email.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return colors[hash % colors.length];
  };

  const gradientClass = getColorFromEmail(comment.email);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md border-gray-200 dark:border-gray-700">
        <CardHeader className={`bg-gradient-to-r ${gradientClass} p-4`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white line-clamp-1">
                  {comment.name}
                </h3>
                <div className="flex items-center text-xs text-white/80">
                  <Mail className="mr-1 h-3 w-3" />
                  <span>{comment.email}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(comment)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowDeleteDialog(true)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {comment.body}
            </p>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this comment. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(comment.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
