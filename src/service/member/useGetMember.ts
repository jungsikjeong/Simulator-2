import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { MemberQueryOptions } from './queries';
import type { Database } from '@/supabase/database.types';

export const useGetMember = (id: string) => {
  return useSuspenseQuery({
    ...MemberQueryOptions.getMember(id),
  });
};

export const useUpdateMemberStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Database['public']['Enums']['status'] }) => {
      return MemberQueryOptions.updateMemberStatus(id, status).queryFn();
    },
  });
};

export const useGetCurrentMemberId_2 = () => {
  return useSuspenseQuery({
    ...MemberQueryOptions.getCurrentMemberId_2(),
  });
};

export const useGetCurrentMemberName_2 = () => {
  return useSuspenseQuery({
    ...MemberQueryOptions.getCurrentMemberName_2(),
  });
};

export const useUpdateMemberName = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => {
      return MemberQueryOptions.updateMemberName(id, name).queryFn();
    },
  });
};

