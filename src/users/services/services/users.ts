import { rewardsApiUrl } from '@/core/client-settings';
import { UserProfileEntity } from '../models/entities/user-profile.entity';
import { UserRankEntity } from '../models/entities/user-rank.entity';

export const getUserByUsername = async (
  username: string
): Promise<{ users: UserRankEntity[] }> => {
  const res = await fetch(`${rewardsApiUrl}/users?username=${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data as { users: UserRankEntity[] };
};

export const getUserById = async (
  id: string
): Promise<{ user: UserProfileEntity }> => {
  const res = await fetch(`${rewardsApiUrl}/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data as { user: UserProfileEntity };
};
