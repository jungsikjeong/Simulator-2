import { supabase } from '@/lib/supabase';
import MemberService from '@/service/member/service';
import type { Tables } from '@/supabase/database.types';
import { useMutation } from '@tanstack/react-query';

type Member = Tables<'members'>;

export const useUpdateMemberName = () => {
    const memberService = new MemberService(supabase);

    return useMutation<Member, Error, { name: string; id: string }>({
        mutationFn: async ({ name, id }) => {
            const member = await memberService.updateMemberName(id, name);
            return member;
        },
    });
}; 