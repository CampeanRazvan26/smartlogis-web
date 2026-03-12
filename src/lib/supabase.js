import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Auth helpers
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUp = (email, password, metadata) =>
  supabase.auth.signUp({ email, password, options: { data: metadata } })

export const signOut = () => supabase.auth.signOut()

// Vehicles CRUD
export const getVehicles = (tenantId) =>
  supabase.from('vehicles').select('*')
    .eq('tenant_id', tenantId).order('created_at')

export const upsertVehicle = (vehicle) =>
  supabase.from('vehicles').upsert(vehicle).select()

export const deleteVehicle = (id) =>
  supabase.from('vehicles').delete().eq('id', id)

// Realtime GPS subscription
export const subscribeToVehicles = (tenantId, callback) =>
  supabase.channel(`vehicles-${tenantId}`)
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'vehicles',
      filter: `tenant_id=eq.${tenantId}`
    }, callback).subscribe()