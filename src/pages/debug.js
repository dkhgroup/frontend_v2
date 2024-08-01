import { getFBCookie } from "@/components/capi/event"

export default function DebugPage(){

    const handleClick = () => {
        const cok = getFBCookie()
        console.log("🚀 ~ handleClick ~ cok:", cok)
    }

    return(
        <button onClick={handleClick}>click</button>
    )
}