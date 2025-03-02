'use client';
import { Dropdown } from '@/shared/components/dropdown';
import { InputOutline } from '@/shared/components/input-outline';
import { LensIcon } from '@/shared/svgs/icons';
import { useDebounceUsersHook } from '@/users/hooks/use-debounce-users.hook';
import { useSearchUsers } from '@/users/hooks/use-serach-users.hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './search-users.module.css';

export function SearchUsers() {
  const [search, setSearch] = useState<string>('');
  const { value, isBouncing } = useDebounceUsersHook({ value: search });
  const { error, data, isLoading } = useSearchUsers({
    username: value,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const users = data?.users || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getError = (): string | undefined => {
    if (users.length === 0 && search.length < 3)
      return 'Ingrese al menos 3 carácteres para iniciar la búsqueda';
    if (users.length === 0 && search.length >= 3)
      return 'No se han encontrado usuarios con el nombre de usuario ingresado.';
    if (error) return error.message;
    return undefined;
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        <LensIcon
          height={25}
          width={25}
          className={styles['icon-search']}
          fill={
            isTouched
              ? 'var(--ui-kit-secondary-300)'
              : 'var(--ui-kit-secondary-400)'
          }
        />
        <InputOutline
          type="text"
          name="search-user"
          className={styles['input-search']}
          placeholder="Buscar"
          value={search}
          onFocus={() => setIsTouched(true)}
          onBlur={() => setIsTouched(false)}
          onChange={handleSearchChange}
        />
      </div>

      <Dropdown.Box
        isOpen={isOpen || isTouched}
        error={getError()}
        isLoading={isLoading || isBouncing}
      >
        {users.map(({ id, username, avatar }) => (
          <Dropdown.Item
            key={id}
            className={styles['item-option']}
            onClick={() => router.push(`/user/${id.replace('?', '')}`)}
          >
            <img
              className={styles.avatar}
              src={avatar}
              loading="lazy"
              alt={`Avatar ${username}`}
              width={30}
              height={30}
            />
            {username}
          </Dropdown.Item>
        ))}
      </Dropdown.Box>
    </div>
  );
}
