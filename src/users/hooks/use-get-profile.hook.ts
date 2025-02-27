'use client';
import { useEffect, useState } from 'react';
import { UserProfileEntity } from '../services/models/entities/user-profile.entity';
import { getUserById } from '../services/services/users';

export function useGetProfileHook({ id }: { id: string }) {
  const [data, setData] = useState<UserProfileEntity>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { user } = await getUserById(id);
        setData(user);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    if (id) {
      getUser();
    }
  }, [id]);

  return { data, isLoading, error };
}
