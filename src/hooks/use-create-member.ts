import { supabase } from '@/lib/supabase';
import MemberService from '@/service/member/service';
import type { Tables } from '@/supabase/database.types';
import { useMutation } from '@tanstack/react-query';

type Member = Tables<'members'>;

export const useCreateMember = () => {
  const memberService = new MemberService(supabase);

  return useMutation<Member, Error, { name: string; id: string }>({
    mutationFn: async ({ name, id }) => {
      const member = await memberService.createMember(name, id);
      localStorage.setItem('currentMemberId', id);
      localStorage.setItem('currentMemberName', name);
      return member;
    },
  });
};
