import { useState, useCallback } from 'react'

export interface Toast { id: number; msg: string; type: 'success' | 'error' }

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((msg: string, type: Toast['type'] = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 2800)
  }, [])

  return { toasts, show }
}
