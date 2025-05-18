import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Experience } from './Experience';
import { Form } from './Form';
export const App = () => {
    const [slideIndex, setSlideIndex] = useState(0);

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
        </div>
    );
}