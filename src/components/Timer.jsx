import { useEffect, useState } from "react"
export default function Timer({ handleTimeOut, timeOut }) {
    const [remaintingTime, setRemainingTime] = useState(timeOut)
    useEffect(() => {
        const timeId = setInterval(
            () => {
                console.log('interval timer')
                setRemainingTime(
                    (prev) => {
                        return (prev - 100)
                    }
                )
            }, 100)
        return () => {
            console.log('clearing interval timer')
            clearInterval(timeId)
        }
    }, [])
    useEffect(() => {
        console.log('timeout timer')

        const timerId = setTimeout(handleTimeOut, timeOut)
        return () => { 
            console.log('clearing timeout timer')
            
            clearTimeout(timerId)}
    }, [])
    return <>
        <p>Time Left: {(remaintingTime/1000).toFixed(2)}</p>
        <progress id='question-time' value={remaintingTime} max={timeOut} >
        </progress>
    </>
}