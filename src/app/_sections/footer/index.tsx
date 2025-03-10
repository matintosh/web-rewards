import { Collaborator } from '@/shared/components/collaborator';
import Link from 'next/link';
import { EmbeeLink } from './embee-link';
import styles from './footer.module.css';

const collaborators = [
  {
    username: 'GountzJs',
    socialUrl: 'https://github.com/GountzJs',
    url: '/avatars/gountz.avif',
  },
  {
    username: 'Su1zide',
    socialUrl: 'https://www.instagram.com/su1zide',
    url: '/avatars/su1zide.avif',
  },
  {
    username: 'Mari_yusi',
    socialUrl: 'https://www.twitch.tv/mari_yusi',
    url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a4c4a605-4488-4f07-8b50-57d514879cba-profile_image-70x70.jpeg',
  },
];

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.detail}>
        <p>
          Inspirado en{' '}
          <Link
            href="https://manz.dev/manzcards"
            target="_blank"
            className={styles['nav-link']}
          >
            Manzdev
          </Link>{' '}
          y{' '}
          <Link
            href="https://cards.uxanarangel.com"
            target="_blank"
            className={styles['nav-link']}
          >
            AnaRangel
          </Link>
          .
        </p>
        <p>
          Mención honorífica a{' '}
          <Link
            href="https://uxcorprangel.github.io/"
            target="_blank"
            className={styles['nav-link']}
          >
            UX Corp Rangel
          </Link>{' '}
          por su increíble trabajo e inspiración dentro de la comunidad.
        </p>

        <p>
          ¡Síguelos en sus redes y estén atentos a futuros proyectos! ¡Muchas
          gracias!
        </p>
      </div>
      <EmbeeLink />
      <div className={styles['collaborators-container']}>
        <p>Colaboradores:</p>
        <div className={styles['collaborators']}>
          {collaborators.map(({ username, socialUrl, url }, idx) => (
            <Collaborator
              key={idx}
              username={username}
              socialUrl={socialUrl}
              url={url}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
