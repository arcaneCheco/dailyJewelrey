import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Experience } from './Experience';
import { Form } from './Form';
import { Gate } from './Gate';
export const App = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isGate, setIsGate] = useState(true);

    useEffect(() => {
        const experience = new Experience(setSlideIndex);
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
            {isGate && <Gate closeGate={() => {setIsGate(false)}} />}
        </div>
    );
}