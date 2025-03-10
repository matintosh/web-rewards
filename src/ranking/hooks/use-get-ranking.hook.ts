'use client';
import { UserRankEntity } from '@/users/services/models/entities/user-rank.entity';
import useSWR from 'swr';
import { getRanking } from '../services/ranking';

export function useGetRankingHook() {
  const { data, error, isLoading } = useSWR<
    { ranking: UserRankEntity[] },
    Error
  >('ranking', getRanking);

  return {
    ranking: data?.ranking || null,
    error,
    isLoading,
  };
}
