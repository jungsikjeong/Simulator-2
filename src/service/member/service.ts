import Service from '../Service'
import type { Database } from "@/supabase/database.types"

export default class MemberService extends Service {
    async createMember(name: string, id: string) {
        const { data, error } = await this.supabase
            .from('members')
            .insert({
                id,
                name,
                status: 'pending' as Database['public']['Enums']['status']
            })
            .select()
            .single()

        if (error) throw error
        return data
    }
}
