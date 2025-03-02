import useSWR from 'swr';
import { getUserByUsername } from '../services/services/users';

interface Props {
  username: string;
}

export function useSearchUsers({ username }: Props) {
  const { data, error, isValidating } = useSWR(
    username.length >= 3 ? ['search-users', username] : null,
    () => getUserByUsername(username),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
