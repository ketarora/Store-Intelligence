export type StoreEvent = {
  event_id: string
  event_type: string
  visitor_id: string | null
  timestamp: string
  zone_id: string | null
  shelf_category: string | null
  is_staff: boolean
  visit_type: string | null
  group_size: number | null
  queue_depth: number | null
  camera_id: string | null
}

export type VisitorSession = {
  session_id: string
  visitor_id: string
  visit_type: 'solo' | 'group'
  group_size: number
  is_staff: boolean
  is_returning?: boolean
  visit_count?: number
  recognition_method?: string
  entry_time: string | null
  exit_time: string | null
  billing_time: string | null
  purchase_time: string | null
  entry_to_purchase_seconds: number | null
  purchase_flag: boolean
  zones_visited: string[]
  status: string
}

export type QueueSnapshot = {
  queue_depth: number
  wait_estimate_seconds: number
  timestamp: string
}

export type ShelfZone = {
  zone_id: string
  label: string
  category: string
  color: string
  brands: string[]
}

export type AnomalyItem = {
  severity: 'WARN' | 'INFO'
  type: 'QUEUE_SPIKE' | 'CONVERSION_DROP' | 'DEAD_ZONE'
  message: string
  suggested_action: string
  value: number | null
}

export type ReturningProfile = {
  visitor_id: string
  visit_count: number
  first_seen: string | null
  last_seen: string | null
  recognition_method: string
  last_confidence: number
}

export type LiveStats = {
  visitors: number
  staff: number
  solo: number
  groups: number
  entries: number
  exits: number
  queue_depth: number
  returning: number
  new_visitors: number
  cameras?: Record<string, Partial<LiveStats>>
}

export type FunnelData = {
  entry: number
  zone_visit: number
  billing: number
  purchase: number
}

export type HealthData = {
  status: string
  stale_feed: boolean
}

export type CameraStream = {
  camera_id: string
  store_id: string
  camera_type: string
  zones: string[]
  stream_url: string
  ws_url: string
}

export const CAMERA_ORDER: string[] = ['CAM_3', 'CAM_1', 'CAM_5', 'CAM_2', 'CAM_4']

export const CAMERA_META: Record<string, { type: string; zones: string[]; label: string }> = {
  CAM_3: { type: 'ENTRY',   zones: ['ENTRANCE'],    label: 'Entry · CAM 3' },
  CAM_1: { type: 'FLOOR',   zones: ['SKINCARE'],    label: 'Skincare · CAM 1' },
  CAM_5: { type: 'BILLING', zones: ['BILLING'],     label: 'Billing · CAM 5' },
  CAM_2: { type: 'FLOOR',   zones: ['MAKEUP','HAIRCARE'], label: 'Makeup · CAM 2' },
  CAM_4: { type: 'STAFF',   zones: ['BACK_OFFICE'], label: 'Staff · CAM 4' },
}

export const EVENT_LABELS: Record<string, string> = {
  ENTRY:               'ENTRY',
  EXIT:                'EXIT',
  RETURNING_CUSTOMER:  '↩ RETURN',
  REENTRY:             'RE-ENTRY',
  ZONE_ENTER:          'ZONE IN',
  ZONE_DWELL:          'DWELL',
  BILLING_QUEUE_JOIN:  'QUEUE',
  STAFF_FLAG:          'STAFF',
}

export const ZONE_COLORS: Record<string, string> = {
  ENTRANCE:    '#94a3b8',
  SKINCARE:    '#16a34a',
  MAKEUP:      '#ea580c',
  HAIRCARE:    '#ca8a04',
  BILLING:     '#1d4ed8',
  BACK_OFFICE: '#475569',
}
