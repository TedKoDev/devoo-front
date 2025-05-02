"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/useUserStore"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  content: string
  author: string
  authorImage?: string
  date: string
  ip: string
  likes: number
}

interface CommentSectionProps {
  comments: Comment[]
  postId: string
  onAddComment?: (comment: Omit<Comment, "id" | "date" | "likes" | "ip">) => void
}

export default function CommentSection({ comments: initialComments, postId, onAddComment }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [userIp, setUserIp] = useState("")
  const { isLoggedIn, user } = useUserStore()
  const { toast } = useToast()

  // 사용자 IP 가져오기
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json")
        const data = await res.json()
        setUserIp(data.ip)
      } catch (error) {
        console.error("Failed to fetch IP:", error)
        setUserIp("Unknown")
      }
    }

    fetchIp()
  }, [])

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "댓글 내용을 입력해주세요",
        variant: "destructive",
      })
      return
    }

    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요합니다",
        description: "댓글을 작성하려면 로그인해 주세요.",
        variant: "destructive",
      })
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: user?.username || "익명",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString().split("T")[0],
      ip: userIp,
      likes: 0,
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")

    if (onAddComment) {
      onAddComment({
        content: newComment,
        author: user?.username || "익명",
        authorImage: "/placeholder.svg?height=40&width=40",
      })
    }

    toast({
      title: "댓글이 등록되었습니다",
    })
  }

  const formatIp = (ip: string) => {
    // IP 주소의 마지막 부분을 가리기 (예: 123.456.789.xxx)
    const parts = ip.split(".")
    if (parts.length === 4) {
      parts[3] = "xxx"
      return parts.join(".")
    }
    return ip
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold mb-4">댓글 {comments.length}개</h3>

      <div className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
          placeholder={isLoggedIn ? "댓글을 작성해주세요..." : "댓글을 작성하려면 로그인해 주세요."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isLoggedIn}
        ></textarea>
        <div className="flex justify-end mt-2">
          <Button onClick={handleSubmitComment} disabled={!isLoggedIn}>
            댓글 작성
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-start mb-2">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src={comment.authorImage || "/placeholder.svg?height=40&width=40"} />
                <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{comment.author}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{comment.date}</span>
                  <span className="text-gray-400">IP: {formatIp(comment.ip)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm ml-11">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
