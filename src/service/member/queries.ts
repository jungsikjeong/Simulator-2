import { supabase } from '@/lib/supabase';
import MemberService from './service';
import type { Database } from '@/supabase/database.types';

export const memberQuerykeys = {
  member: ['member'] as const,
  updateStatus: (id: string) => ['member', 'updateStatus', id] as const,
  updateName: (id: string) => ['member', 'updateName', id] as const,
  currentMemberId_2: ['member', 'currentId_2'] as const,
  currentMemberName_2: ['member', 'currentName_2'] as const,
};

export const MemberQueryOptions = {
  getMember: (id: string) => ({
    queryKey: memberQuerykeys.member,
    queryFn: () => {
      return new MemberService(supabase).getMember(id);
    },
  }),
  updateMemberStatus: (id: string, status: Database['public']['Enums']['status']) => ({
    queryKey: memberQuerykeys.updateStatus(id),
    queryFn: () => {
      return new MemberService(supabase).updateMemberStatus(id, status);
    },
  }),
  getCurrentMemberId_2: () => ({
    queryKey: memberQuerykeys.currentMemberId_2,
    queryFn: () => {
      return new MemberService(supabase).getCurrentMemberId_2();
    },
  }),
  getCurrentMemberName_2: () => ({
    queryKey: memberQuerykeys.currentMemberName_2,
    queryFn: () => {
      return new MemberService(supabase).getCurrentMemberName_2();
    },
  }),
  updateMemberName: (id: string, name: string) => ({
    queryKey: memberQuerykeys.updateName(id),
    queryFn: () => {
      return new MemberService(supabase).updateMemberName(id, name);
    },
  }),
};
