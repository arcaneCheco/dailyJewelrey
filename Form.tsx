import { Button } from './Button';
import styles from './Form.module.css';

export const Form = ({isOpen, open, close}: {isOpen: boolean, open: () => void, close: () => void}) => {
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the wrapper itself, not its children
        if (e.target === e.currentTarget) {
            close();
        }
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent click from bubbling up to wrapper
        open();
    };

    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`} onClick={handleWrapperClick}>
            <div className={styles['inner-wrapper']}>
                <Button className={styles['open-button']} onClick={handleButtonClick} />
                <div className={styles.content}>
                    <p className={styles.title}>Subscribe to the daily Jewellery</p>
                    <input className={styles.input} type="text" placeholder="Email" />
                    <button className={styles.button} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.stopPropagation()}}>Subscribe</button>
                </div>
            </div>
        </div>
    )
}