import styles from './index.module.scss';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
    </div>
  );
}

export default Loader;
