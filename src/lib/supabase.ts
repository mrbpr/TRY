import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_anon_key'

// Only create client if we have valid environment variables
const hasValidConfig = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder_anon_key'

export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface TeamMember {
  id?: string
  name: string
  role: string
  credentials: string
  image_url: string
  description: string
  order_index: number
  created_at?: string
  updated_at?: string
}

// Team member database operations
export const teamMemberService = {
  // Get all team members
  async getAll(): Promise<TeamMember[]> {
    if (!supabase) {
      console.warn('Supabase not configured, using default team members')
      return []
    }
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // Create new team member
  async create(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update team member
  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    const { data, error } = await supabase
      .from('team_members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete team member
  async delete(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Upload image to Supabase Storage
  async uploadImage(file: File, memberId: string): Promise<string> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${memberId}-${Date.now()}.${fileExt}`
    const filePath = `team-photos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('team-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('team-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // Delete image from storage
  async deleteImage(imageUrl: string): Promise<void> {
    if (!supabase) {
      return // Silently skip if Supabase not configured
    }
    if (!imageUrl.includes('supabase')) return // Only delete Supabase images
    
    const path = imageUrl.split('/').pop()
    if (!path) return

    const { error } = await supabase.storage
      .from('team-images')
      .remove([`team-photos/${path}`])

    if (error) console.warn('Failed to delete image:', error)
  }
}