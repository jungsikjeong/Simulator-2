import Service from '../Service';
import type { Database } from '@/supabase/database.types';

export default class MemberService extends Service {
  async createMember(name: string, id: string) {
    const { data, error } = await this.supabase
      .from('members_2')
      .insert({
        id,
        name,
        status: 'pending' as Database['public']['Enums']['status'],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMember(id: string) {
    const { data, error } = await this.supabase
      .from('members_2')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  }

  async updateMemberStatus(id: string, status: Database['public']['Enums']['status']) {
    const { data, error } = await this.supabase
      .from('members_2')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCurrentMemberId_2() {
    const currentId = localStorage.getItem('currentMemberId_2');
    if (!currentId) throw new Error('No current member found');
    return currentId;
  }


  async getCurrentMemberName_2() {
    const currentId = await this.getCurrentMemberId_2();
    const { data, error } = await this.supabase
      .from('members_2')
      .select('name')
      .eq('id', currentId)
      .single();

    if (error) throw error;
    return data.name;
  }

  async updateMemberName(id: string, name: string) {
    const { data, error } = await this.supabase
      .from('members_2')
      .update({ name })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
