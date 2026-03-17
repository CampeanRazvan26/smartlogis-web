import Map, { Marker, Popup, Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState, useEffect } from 'react'
import { subscribeToVehicles } from '../lib/supabase'

export default function FleetMap({ vehicles, tenantId }) {
  const [selected, setSelected] = useState(null)
  const [liveVehicles, setLiveVehicles] = useState(vehicles)

  // Supabase Realtime — actualizează automat când GPS trimite date
  useEffect(() => {
    const sub = subscribeToVehicles(tenantId, (payload) => {
      setLiveVehicles(prev => prev.map(v =>
        v.id === payload.new.id ? { ...v, ...payload.new } : v
      ))
    })
    return () => sub.unsubscribe()
  }, [tenantId])

  const statusColor = {
    critical: '#f87171',
    warning: '#fbbf24',
    ok: '#34d399'
  }

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{ longitude: 25.0, latitude: 45.9, zoom: 6 }}
      style={{ width: '100%', height: '340px', borderRadius: '12px' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      {liveVehicles.map(v => (
        <Marker key={v.id}
          longitude={v.last_lng || 25}
          latitude={v.last_lat || 45.9}
          onClick={() => setSelected(v)}
        >
          <div style={{
            background: statusColor[v.status],
            width: 28, height: 28, borderRadius: '50%',
            display: 'flex', alignItems: 'center',
            cursor: 'pointer', fontSize: 14,
            boxShadow: `0 0 12px ${statusColor[v.status]}66`
          }}>🚛</div>
        </Marker>
      ))}
      {selected && (
        <Popup longitude={selected.last_lng} latitude={selected.last_lat}
          onClose={() => setSelected(null)} closeButton={false}
        >
          <div style={{ padding: '8px', minWidth: 160 }}>
            <strong>{selected.plate}</strong><br/>
            {selected.driver_name}<br/>
            UIT: {selected.uit_code}
          </div>
        </Popup>
      )}
    </Map>
  )
}