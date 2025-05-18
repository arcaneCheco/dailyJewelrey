import styles from './Button.module.css';

export const Button = ({className, onClick}: {className?: string, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.bg} />
            <div className={styles['button-wrapper']}>
                <button className={styles.button} onClick={onClick}>
                    <svg fill='#FFFFFF' width="28px" height="28px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208,172a11.96187,11.96187,0,0,1-8.48535-3.51465L128,96.9707,56.48535,168.48535a12.0001,12.0001,0,0,1-16.9707-16.9707l80-80a11.99975,11.99975,0,0,1,16.9707,0l80,80A12,12,0,0,1,208,172Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};