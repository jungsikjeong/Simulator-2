import { supabase } from '@/lib/supabase'
import MemberService from './service'
import type { Database } from "@/supabase/database.types"

type Member = Database['public']['Tables']['members']['Row']

export const querykeys = {
    member: ['member'] as const,
}

export const MemberQueryOptions = {
    createMember: (name: string) => ({
        mutationKey: [...querykeys.member, 'create', name],
        mutationFn: async (id: string): Promise<Member> => {
            const service = new MemberService(supabase)
            return service.createMember(name, id)
        }
    })
}


