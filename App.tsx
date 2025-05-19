import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Experience, loadAllVideos } from './Experience';
import { Form } from './Form';
import { Gate } from './Gate';
import { LoadingScreen } from './LoadingScreen';
export const App = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingScreen, setIsLoadingScreen] = useState(true);
    const [isGate, setIsGate] = useState(true);

    const loadVideos = async () => {
        await loadAllVideos();
        setIsLoading(false);
    }

    useEffect(() => {
        const experience = new Experience(setSlideIndex);
        loadVideos();
        return () => {
            experience.destroy();
        };
    }, []);

    useEffect(() => {
        console.log({slideIndex});
    }, [slideIndex]);

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div id="app" className={styles.app}>
            <div id="experience" className={styles.experience} />
            <div className={styles.content}>
                <Form 
                    isOpen={isFormOpen} 
                    open={() => {setIsFormOpen(true)}} 
                    close={() => {setIsFormOpen(false)}}
                 />
            </div>
            {isGate && <Gate closeGate={() => {setIsGate(false)}} isLoadingScreen={isLoadingScreen} />}
            {isLoadingScreen && <LoadingScreen isLoading={isLoading} setIsLoadingScreen={setIsLoadingScreen} />}
        </div>
    );
}