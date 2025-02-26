import { Navbar } from '../navbar';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <Navbar />
      <p className={styles.disclaimer}>
        <strong>Embee rewards</strong> no cuenta con el respaldo de{' '}
        <strong>Riot games</strong> y no refleja las opiniones ni los puntos de
        vista de <strong>Riot games</strong> ni de ninguna persona involucrada
        oficialmente en la producción o administración de propiedades de{' '}
        <strong>Riot games</strong>. <strong>Riot games</strong> y todas las
        propiedades asociadas son marcas comerciales o marcas comerciales
        registradas de <strong>Riot games, Inc</strong>.
      </p>
    </header>
  );
}
