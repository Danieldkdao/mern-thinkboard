import { createContext, type ReactNode, useState } from 'react';

type RenderType = {
    render: boolean,
    rerender: () => void
}

export const RenderContext = createContext<RenderType | null>(null);
export default function RenderProvider({children}: {children: ReactNode}){
    const [ render, setRender ] = useState<boolean>(true);
    const rerender = () => setRender(!render);

    return (
        <RenderContext.Provider value={{render, rerender}}>
            {children}
        </RenderContext.Provider>
    )
}