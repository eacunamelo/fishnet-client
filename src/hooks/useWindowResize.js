import { useEffect, useState } from 'react'

const useWindowResize = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
    const onScroll = (e) => setScreenWidth(window.innerWidth);
        
    window.addEventListener('resize', onScroll);
    
    return () => {
        window.removeEventListener('resize', onScroll);
    }
    }, []);

    return [screenWidth]
}

export default useWindowResize