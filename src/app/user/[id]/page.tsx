import { ListBorders } from '@/borders/components/list-borders';
import { regexUUIDV4 } from '@/shared/utils/regex-uuid-v4';
import { UserProfile } from '@/users/components/user-profile/user-profile';
import styles from './page.module.css';

export const runtime = 'edge';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  const uuidV4 = id.match(regexUUIDV4) as unknown as string;

  return (
    <main className={styles.container}>
      <article className={styles['profile-container']}>
        <UserProfile id={uuidV4} />
      </article>
      <section className={styles['borders-container']}>
        <ListBorders id={uuidV4} />
      </section>
    </main>
  );
}
