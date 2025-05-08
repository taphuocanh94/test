'use client'

import { PostsProvider } from "./posts-provider"

export default function PostLayout({
    children
}: {
    children: React.ReactNode
}) {
    const initPosts: TPost[] = []
    console.log('Posts layout loaded')
    return <PostsProvider initPosts={initPosts}>

        {children}
    </PostsProvider>

}