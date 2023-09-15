import { useEffect, useState, useRef } from 'react';
const useSocket = (initial) => {
    const [message, setMessage] = useState(initial)
    const ws = useRef(null)    
    const ws1 = useRef(null)
    const isClose = useRef(true)
    const isOpen = useRef(false)
   
    const start = () => {
        isOpen.current = false

        //ws.current = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws/test`)
        ws.current = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws/socket`)
        ws1.current = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws/socketPublish`)
        ws.current.onopen = e => {
            console.log('WS Server: WS is openned')
            setMessage(initial)
            isOpen.current = true
        }
        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log("Message received WS: "+ message);
            setMessage(message) 
        }
        ws.current.onclose = e => {               
            console.log('WS Server: WS was closed')
            setMessage(initial)   

            if (isClose.current || isOpen.current) {
                setInterval(start(), 5000)
            }
        }
        ws.current.onerror  = e => {
            const message = JSON.parse(e.data);
            console.log("ERROR: "+ message);
            setMessage(message) 
        }
        
        ws1.current.onopen = e => {
            console.log('WS1 Server: WS1 is openned')
            setMessage(initial)
            isOpen.current = true
        }
        // ws1.current.onmessage = e => {
        //     const message = e.data;
        //     console.log("Message received WS1: "+ message);
        // }
        ws1.current.onclose = e => {               
            console.log('WS1 Server: WS1 was closed')
            setMessage(initial)   

            if (isClose.current || isOpen.current) {
                setInterval(start(), 5000)
            }
        }
        ws1.current.onerror  = e => {
            const message = JSON.parse(e.data);
            console.log("ERROR: "+ message);
            setMessage(message) 
        }
    }

    useEffect(() => {
        start()

        return() => {
            if (isOpen.current) {
                ws.current.close()
            }
            isClose.current = false
            isOpen.current = false
        }
    }, []);

    return [ws, ws1, message, setMessage]
}
  
export default useSocket