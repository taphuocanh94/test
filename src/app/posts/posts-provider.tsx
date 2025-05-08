'use client'

import { createContext, useEffect } from "react"
import { useAppContext } from "../app-provider"
import Link from "next/link"

export const postsContext = createContext({})

export function PostsProvider({
    children,
    initPosts
}: {
    children: React.ReactNode
    initPosts: TPost[]
}) {

    const { appStates, setAppStates } = useAppContext()
    
    useEffect(( ) => {
        setAppStates({
            type: 'SET_POSTS', payload: initPosts
        })
    }, [initPosts])

    return <postsContext.Provider value={{}}>
        <div className="flex flex-row  items-center">
        <button className="bg-primary rounded-md text-white px-4 py-2 me-4" onClick={() => {
            setAppStates({
                type: 'SET_POSTS', payload: [
                    {
                        id: '1',
                        title: 'post-1'
                    },
                    {
                        id: '2',
                        title: 'post-2'
                    },
                    {
                        id: '3',
                        title: 'post-3'
                    },
                    {
                        id: '4',
                        title: 'post-4'
                    }
                ]
            })
        }}>load posts</button>

        <div className="space-x-2">
            {
                appStates.posts.map(post => {
                    return <Link key={post.id} href={"/posts/" + post.id}  className="bg-blue-600 rounded-md text-white px-4 py-2">{post.title}</Link>
                })
            }
        </div>
        </div>
        {children}
    </postsContext.Provider>
}