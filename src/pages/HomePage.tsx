import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import CommentCard from "../components/listing-card/comment-card";
import CommentDialog from "../components/form/comment-dialog";
import { Toaster, toast } from "sonner";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/api";
import type { Comment } from "../types/types";

function HomePage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    filterComments();
  }, [comments, searchTerm, filterBy]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getComments();
      setComments(data);
      setError(null);
    } catch (err) {
      setError("Failed to load comments. Please try again later.");
      toast.error("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterComments = () => {
    let filtered = [...comments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterBy !== "all") {
      if (filterBy === "az") {
        // Sort A-Z by name
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filterBy === "za") {
        // Sort Z-A by name
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    setFilteredComments(filtered);
  };

  const handleAddComment = async (newComment: Omit<Comment, "id">) => {
    try {
      const data = await createComment(newComment);

      // JSONPlaceholder doesn't actually add the resource, so we'll simulate it
      // by adding the returned data with a new ID to our local state
      const newId = Math.max(...comments.map((c) => c.id)) + 1;
      const commentWithNewId = { ...data, id: newId };

      setComments([commentWithNewId, ...comments]);
      setIsFormOpen(false); // Close the dialog
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleUpdateComment = async (updatedComment: Comment) => {
    try {
      await updateComment(updatedComment);

      // Update locally
      setComments(
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
      setEditingComment(null);
      setIsFormOpen(false); // Close the dialog
      toast.success("Comment updated successfully!");
    } catch (err) {
      toast.error("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);

      // Remove locally
      setComments(comments.filter((comment) => comment.id !== id));
      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-400 rounded-lg p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">Comments Manager</h1>
        <p className="text-white">
          Browse, search, add, edit, and delete comments from JSONPlaceholder
          API
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Comments</SelectItem>
            <SelectItem value="az">Sort A-Z</SelectItem>
            <SelectItem value="za">Sort Z-A</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setEditingComment(null);
            setIsFormOpen(true);
          }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
        >
          <Plus className="mr-2 text-white" size={16} />
          Add Comment
        </Button>
      </div>

      {/* Comment Dialog */}
      <CommentDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={editingComment ? handleUpdateComment : handleAddComment}
        initialData={editingComment}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="ml-2 text-lg text-indigo-600">
            Loading comments...
          </span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <Button
            variant="outline"
            onClick={fetchComments}
            className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Comments List */}
      {!loading && !error && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {filteredComments.length}{" "}
            {filteredComments.length === 1 ? "Comment" : "Comments"} Found
          </h2>

          {filteredComments.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No comments found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          )}
        </>
      )}
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default HomePage;
