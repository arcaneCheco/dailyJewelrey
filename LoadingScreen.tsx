import styles from './LoadingScreen.module.css';
import { startVideos } from './Experience';

export const LoadingScreen = ({isLoading, setIsLoadingScreen}: {isLoading: boolean, setIsLoadingScreen: (isLoadingScreen: boolean) => void}) => {
    const handleClick = async () => {
        console.log('starting videos');
        await startVideos();
        console.log('close loader');
        setIsLoadingScreen(false);
    }
    return (
        <div className={styles.wrapper}>
            {isLoading && <div className={styles.loader} />}
            {!isLoading && <div className={styles.enter}>
                <div className={styles['enter-bg']} />
                <button className={styles.button} onClick={handleClick} />
            </div>}
        </div>
    )
}