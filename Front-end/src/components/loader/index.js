import styles from './styles';

const Loader = () => {
    return <div className={styles.container}>
        <div className="relative">
            <div className={styles.firstBlock} />
            <div className={styles.secondBlock} />
        </div>
    </div>
}
export default Loader;