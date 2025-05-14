import { useMutation } from "@tanstack/react-query";
import { MemberQueryOptions } from "./queries";
import type { Database } from "@/supabase/database.types"

type Member = Database['public']['Tables']['members']['Row']

export const useMember = () => {
    const createMember = useMutation<Member, Error, { name: string, id: string }>({
        ...MemberQueryOptions.createMember(''),
        mutationFn: ({ name, id }) => MemberQueryOptions.createMember(name).mutationFn(id)
    })

    return {
        createMember
    }
}

