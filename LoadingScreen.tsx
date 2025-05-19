import styles from './LoadingScreen.module.css';

export const LoadingScreen = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}