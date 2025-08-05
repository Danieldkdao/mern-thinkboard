import { useContext } from "react";
import { RenderContext } from "./RenderContext";

export default function useRender(){
    const context = useContext(RenderContext);
    if(!context){
        throw new Error("Context must be used inside provider.");
    }
    return context;
}