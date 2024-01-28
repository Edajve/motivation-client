import { ReactNode, useEffect, useState } from 'react';
import getPhoto from '../hooks/getRandomPhoto';

interface BackgroundProps {
    children: ReactNode;
}

function Background({ children }: BackgroundProps) {
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        // set new photo when its a new day
        // var x = getPhoto()
        // console.log(x)
      }, [photo]);

    return (
        <div style={{ backgroundColor: 'green', opacity: '0.5', height: '100vh' }}>
            console.log(x)
            {children}
        </div>
    );
}

export default Background;