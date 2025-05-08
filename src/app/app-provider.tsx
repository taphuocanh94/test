'use client'
import { usePathname } from "next/navigation";
import { ActionDispatch, createContext, Suspense, useContext, useEffect, useReducer } from "react"
import Loading from "./loading";
import test from "@/actions/test";

export type AppContextBaseStateType = {
    runnintTestAction: boolean;
    posts: TPost[];
}


const defaultAppContextState: AppContextBaseStateType = {
    runnintTestAction: false,
    posts: [],
}


export type AppContextType = {
    appStates: AppContextBaseStateType;
    setAppStates: ActionDispatch<[action: AppSetStatesAction]>;
}

export const AppContext = createContext<AppContextType>({
    appStates: defaultAppContextState,
    setAppStates: () => { },
})

type AppSetStatesAction =
    | { type: 'SET_POSTS'; payload: AppContextBaseStateType['posts'] }
    | { type: 'SET_TESTING', payload: boolean };


export default function AppProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [appStates, setAppStates] = useReducer(function (prevState: AppContextBaseStateType, action: AppSetStatesAction) {
        const state = prevState
        console.log(action.type)
        if (action.type == 'SET_POSTS') {
            return {
                ...prevState,
                posts: action.payload,
            };
        } else if (action.type == 'SET_TESTING') {
            return {
                ...prevState,
                runnintTestAction: action.payload,
            };
        }
        return state
    }, defaultAppContextState)

    const pathname = usePathname()
    useEffect(() => {
        console.log('pathname changed', pathname)
        const fetchLoggedInState = async () => {
            console.log('before test')
            setAppStates({ type: 'SET_TESTING', payload: true })
            const testResult = await test();
            console.log('after test', testResult)
            setAppStates({ type: 'SET_TESTING', payload: false })
        };

        fetchLoggedInState();
    }, [pathname]);
    return <Suspense fallback={<Loading />}>
        <AppContext.Provider value={{ appStates, setAppStates }}>
            <div className="flex flex-row h-full">
            <pre className="border bg-gray-300 w-1/3">
                App States
                <br></br>
                {JSON.stringify(appStates, undefined, 4)}
            </pre>
            <div className="max-w-[600px]">
                {children}
            </div>
            </div>
        </AppContext.Provider>
    </Suspense>
}


// Custom hook
export const useAppContext = () => useContext(AppContext);
