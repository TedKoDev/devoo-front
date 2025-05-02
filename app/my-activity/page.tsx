"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookmarkIcon, MessageSquare, ThumbsUp, User } from "lucide-react"

export default function MyActivityPage() {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">내 활동</h1>
        <Button>로그인</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>로그인이 필요합니다</CardTitle>
          <CardDescription>내 활동을 확인하려면 로그인해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">로그인하면 댓글 작성, 좋아요, 북마크 등의 기능을 이용할 수 있습니다.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">로그인하기</Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              프로필
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageSquare className="h-4 w-4 mr-2" />
              댓글
            </TabsTrigger>
            <TabsTrigger value="likes">
              <ThumbsUp className="h-4 w-4 mr-2" />
              좋아요
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              북마크
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>프로필</CardTitle>
                <CardDescription>로그인 후 프로필 정보를 확인할 수 있습니다.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>내 댓글</CardTitle>
                <CardDescription>로그인 후 작성한 댓글을 확인할 수 있습니다.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="likes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>좋아요한 글</CardTitle>
                <CardDescription>로그인 후 좋아요한 글을 확인할 수 있습니다.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>북마크</CardTitle>
                <CardDescription>로그인 후 북마크한 글을 확인할 수 있습니다.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
