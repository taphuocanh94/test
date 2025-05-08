'use client'

import { PostsProvider } from "./posts-provider"

export default function PostLayout({
    children
}: {
    children: React.ReactNode
}) {
    const initPosts: TPost[] = []
    return <PostsProvider initPosts={initPosts}>
        
        {children}
    </PostsProvider>

}