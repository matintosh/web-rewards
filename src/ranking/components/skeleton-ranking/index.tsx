import styles from './skeleton-ranking.module.css';

export function SkeletonRanking() {
  const items = Array.from({ length: 10 }, (i) => i);
  return (
    <ul className={styles.container}>
      {items?.map((_, idx) => (
        <li key={idx} className={styles['list-item']}></li>
      ))}
    </ul>
  );
}
