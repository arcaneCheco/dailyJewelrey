import { useRef, useState } from 'react';
import styles from './Gate.module.css';
// @ts-ignore
import videoSrc from './img/daisies.mp4'; 

export const Gate = ({closeGate}: {closeGate: () => void}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userInput.length < 1) return;
        if (userInput.trim().toLowerCase() === 'hell0') {
            formRef.current?.classList.add(styles.close);
            setTimeout(() => {
                closeGate();
            }, 500);
        } else {
            setWarning(true);
        }
    }
    const [userInput, setUserInput] = useState('');
    const [warning, setWarning] = useState(false);
    return (
        <form className={`${styles.wrapper}`} onSubmit={handleSubmit} ref={formRef}>
            <p className={styles.title}>🐱</p>
            <div className={styles['input-wrapper']}>
                <input className={styles.input} type="text" placeholder="Password" value={userInput} onChange={(e) => {
                    setUserInput(e.target.value);
                    setWarning(false);
                }} />
                <button className={styles.button} type="submit" disabled={userInput.length < 1}>
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206.089 206.089">
                        <path d="M142.236,166.897l-10.607-10.606l53.247-53.247l-53.247-53.247l10.607-10.606l63.853,63.853L142.236,166.897z M163.663,103.044L123.32,62.702H0v80.686h123.32L163.663,103.044z"/>
                    </svg>
                </button>
                {warning && <p className={styles.warning}>Wrong password</p>}
            </div>
            <video src={videoSrc} autoPlay muted loop className={styles.video} />
        </form>
    )
}