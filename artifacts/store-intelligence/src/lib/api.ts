import type {
  StoreEvent, VisitorSession, QueueSnapshot,
  ShelfZone, AnomalyItem, ReturningProfile,
  LiveStats, FunnelData, HealthData, CameraStream,
} from './types'

const BASE = import.meta.env.VITE_API_URL ?? ''
const STORE_ID = 'ST1008'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function startStreams(): Promise<void> {
  await fetch(`${BASE}/streams/start`, { method: 'POST' }).catch(() => null)
}

export function listStreams(): Promise<CameraStream[]> {
  return get<CameraStream[]>('/streams').catch(() => [])
}

export function fetchStats(): Promise<LiveStats> {
  return get<LiveStats>('/streams/stats').catch(() => ({
    visitors: 0, staff: 0, solo: 0, groups: 0,
    entries: 0, exits: 0, queue_depth: 0, returning: 0, new_visitors: 0,
  }))
}

export function fetchFunnel(): Promise<FunnelData> {
  return get<FunnelData>(`/stores/${STORE_ID}/funnel`).catch(() => ({
    entry: 0, zone_visit: 0, billing: 0, purchase: 0,
  }))
}

export function fetchMetrics(): Promise<Record<string, number>> {
  return get<Record<string, number>>(`/stores/${STORE_ID}/metrics`).catch(() => ({}))
}

export function fetchHeatmap(): Promise<{ zones: Record<string, number> }> {
  return get<{ zones: Record<string, number> }>(`/stores/${STORE_ID}/heatmap`).catch(() => ({ zones: {} }))
}

export function fetchAnomalies(): Promise<{ anomalies: AnomalyItem[] }> {
  return get<{ anomalies: AnomalyItem[] }>(`/stores/${STORE_ID}/anomalies`).catch(() => ({ anomalies: [] }))
}

export function fetchShelfZones(): Promise<ShelfZone[]> {
  return get<ShelfZone[]>('/shelf-zones').catch(() => [])
}

export function fetchEvents(limit = 50): Promise<StoreEvent[]> {
  return get<StoreEvent[]>(`/live/events?limit=${limit}`).catch(() => [])
}

export function fetchSessions(limit = 30): Promise<VisitorSession[]> {
  return get<VisitorSession[]>(`/live/sessions?limit=${limit}`).catch(() => [])
}

export function fetchQueue(limit = 30): Promise<QueueSnapshot[]> {
  return get<QueueSnapshot[]>(`/live/queue?limit=${limit}`).catch(() => [])
}

export function fetchReturningCustomers(limit = 30): Promise<ReturningProfile[]> {
  return get<ReturningProfile[]>(`/live/returning-customers?store_id=${STORE_ID}&limit=${limit}`).catch(() => [])
}

export function fetchHealth(): Promise<HealthData> {
  return get<HealthData>('/health').catch(() => ({ status: 'unknown', stale_feed: false }))
}

export function wsEventsUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const base = import.meta.env.VITE_WS_URL ?? `${protocol}//${window.location.host}`
  return `${base}/ws/events`
}
