import { supabase } from '@/lib/supabase';
import MemberService from './service';
import type { Database } from '@/supabase/database.types';

export const memberQuerykeys = {
  member: ['member'] as const,
  updateStatus: (id: string) => ['member', 'updateStatus', id] as const,
  updateName: (id: string) => ['member', 'updateName', id] as const,
  currentMemberId: ['member', 'currentId'] as const,
  currentMemberName: ['member', 'currentName'] as const,
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
  getCurrentMemberId: () => ({
    queryKey: memberQuerykeys.currentMemberId,
    queryFn: () => {
      return new MemberService(supabase).getCurrentMemberId();
    },
  }),
  getCurrentMemberName: () => ({
    queryKey: memberQuerykeys.currentMemberName,
    queryFn: () => {
      return new MemberService(supabase).getCurrentMemberName();
    },
  }),
  updateMemberName: (id: string, name: string) => ({
    queryKey: memberQuerykeys.updateName(id),
    queryFn: () => {
      return new MemberService(supabase).updateMemberName(id, name);
    },
  }),
};
