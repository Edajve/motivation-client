import { useEffect, useState } from 'react';
import YearProgress from './YearProgress';
import getPhoto from '../hooks/getRandomPhoto';

interface BackgroundProps {
    children: JSX.Element;
}

const Background = ({ }: BackgroundProps) => {
    const [backgroundColor, setBackgroundColor] = useState<String>('rgba(0, 0, 0, 0.5)');
    const [backgroundImage, setBackgroundImage] = useState<String>('https://images.unsplash.com/photo-1704072384017-788b1ccbaae5?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w1NTk3ODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDY0ODkyMTV8\u0026ixlib=rb-4.0.3\u0026q=85');

    // useEffect(() => {

    //     getPhoto()
    //         .then(({ urls: { full } }) => {
    //             setBackgroundImage(full)
    //             console.log(full)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, [])

    return (
        <div
            id="root"
            style={{
                position: 'relative',
                height: '150vh',
                width: '100vw',
                background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0
            }}
        >

            <YearProgress />
        </div>
    );
};

export default Background;
