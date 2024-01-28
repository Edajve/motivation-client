import { useState } from 'react';
import YearProgress from './YearProgress';

interface BackgroundProps {
    children: JSX.Element;
}

const Background = ({ }: BackgroundProps) => {
    const [backgroundColor, setBackgroundColor] = useState<String>('rgba(0, 0, 0, 0.5)');
    const [backgroundImage, setBackgroundImage] = useState<String>('https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg');

    const updateStyles = () => {
        setBackgroundColor('new-color-value');
        setBackgroundImage('new-image-url');
    };

    return (
        <div
            id="root"
            style={{
                position: 'relative',
                height: '100vh',
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
