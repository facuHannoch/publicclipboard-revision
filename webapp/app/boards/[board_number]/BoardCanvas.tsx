"use client"

import { useEffect, useRef, useState } from 'react'
import type { Coordinates, Size, TextObject } from './board-types'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_OBJECT_SIZE,
  GRID_SIZE,
  MAX_ZOOM,
  MIN_GAP,
  MIN_ZOOM,
  WHEEL_SCROLL_ENABLED
} from './board-constants'

interface DragState {
  id: string
  pointerId: number
  originX: number
  originY: number
  startX: number
  startY: number
}

interface PanState {
  pointerId: number
  pointerType: string
  startX: number
  startY: number
  originScrollLeft: number
  originScrollTop: number
  lastX: number
  lastY: number
  lastTime: number
  velocityX: number
  velocityY: number
}

interface PinchState {
  pointerIds: [number, number]
  startDistance: number
  startZoom: number
  centerX: number
  centerY: number
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

const rectsOverlap = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }, padding = 0) => {
  return !(
    a.x + a.width + padding <= b.x - padding ||
    a.x >= b.x + b.width + padding ||
    a.y + a.height + padding <= b.y - padding ||
    a.y >= b.y + b.height + padding
  )
}

const isOverlapping = (
  candidate: { x: number; y: number; width: number; height: number },
  objects: TextObject[],
  ignoreId?: string
) => {
  return objects.some((obj) =>
    obj.id !== ignoreId
      ? rectsOverlap(
          candidate,
          {
            x: obj.coordinates.x,
            y: obj.coordinates.y,
            width: obj.size.width,
            height: obj.size.height
          },
          MIN_GAP
        )
      : false
  )
}

export const BoardCanvas = ({
  objects,
  onCreate,
  onUpdate,
  onDelete,
  onCopy,
  onStatus
}: {
  objects: TextObject[]
  onCreate: (coordinates: Coordinates, size: Size, content: string) => void
  onUpdate: (id: string, updates: { coordinates?: Coordinates; size?: Size; content?: string }) => void
  onDelete: (id: string) => void
  onCopy: (id: string, content: string) => void
  onStatus: (message: string) => void
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dragState, setDragState] = useState<DragState | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [lastTap, setLastTap] = useState(0)
  const [canvasScale, setCanvasScale] = useState(1)
  const [fitScale, setFitScale] = useState(1)
  const [zoom, setZoom] = useState(1)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const objectsRef = useRef<TextObject[]>([])
  const panStateRef = useRef<PanState | null>(null)
  const inertiaRef = useRef<number | null>(null)
  const pinchRef = useRef<PinchState | null>(null)
  const pointersRef = useRef(new Map<number, { x: number; y: number }>())

  useEffect(() => {
    objectsRef.current = objects
  }, [objects])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateScale = () => {
      const availableWidth = viewport.clientWidth
      const availableHeight = viewport.clientHeight
      const scale = Math.min(1, availableWidth / CANVAS_WIDTH, availableHeight / CANVAS_HEIGHT)
      const nextFit = Number.isFinite(scale) ? scale : 1
      setFitScale(nextFit)
      setCanvasScale(nextFit * zoom)
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(viewport)
    window.addEventListener('resize', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [zoom])

  const updateZoom = (nextZoom: number, focalX: number, focalY: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const boundedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
    const currentScale = canvasScale
    const nextScale = fitScale * boundedZoom
    const worldX = (viewport.scrollLeft + focalX) / currentScale
    const worldY = (viewport.scrollTop + focalY) / currentScale
    setZoom(boundedZoom)
    setCanvasScale(nextScale)
    viewport.scrollLeft = worldX * nextScale - focalX
    viewport.scrollTop = worldY * nextScale - focalY
  }

  useEffect(() => {
    if (!dragState) return

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== dragState.pointerId) return
      const deltaX = (event.clientX - dragState.startX) / canvasScale
      const deltaY = (event.clientY - dragState.startY) / canvasScale
      const current = objectsRef.current.find((obj) => obj.id === dragState.id)
      if (!current) return

      const nextX = clamp(
        dragState.originX + deltaX,
        0,
        CANVAS_WIDTH - current.size.width
      )
      const nextY = clamp(
        dragState.originY + deltaY,
        0,
        CANVAS_HEIGHT - current.size.height
      )

      const candidate = {
        x: nextX,
        y: nextY,
        width: current.size.width,
        height: current.size.height
      }

      if (isOverlapping(candidate, objectsRef.current, current.id)) {
        return
      }

      onUpdate(current.id, { coordinates: { x: nextX, y: nextY } })
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== dragState.pointerId) return
      setDragState(null)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [dragState, canvasScale, onUpdate])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handlePointerMove = (event: PointerEvent) => {
      const panState = panStateRef.current
      if (!panState || event.pointerId !== panState.pointerId) return
      if (pinchRef.current) return
      const deltaX = event.clientX - panState.startX
      const deltaY = event.clientY - panState.startY
      viewport.scrollLeft = panState.originScrollLeft - deltaX
      viewport.scrollTop = panState.originScrollTop - deltaY

      const now = performance.now()
      const dt = now - panState.lastTime || 1
      panState.velocityX = (event.clientX - panState.lastX) / dt
      panState.velocityY = (event.clientY - panState.lastY) / dt
      panState.lastX = event.clientX
      panState.lastY = event.clientY
      panState.lastTime = now
    }

    const handlePointerUp = (event: PointerEvent) => {
      const panState = panStateRef.current
      if (!panState || event.pointerId !== panState.pointerId) return
      panStateRef.current = null
      viewport.style.cursor = ''

      if (panState.pointerType !== 'touch') return
      const speed = Math.hypot(panState.velocityX, panState.velocityY)
      if (speed < 0.05) return

      const decay = 0.95
      let vx = panState.velocityX * 16
      let vy = panState.velocityY * 16
      let lastTime = performance.now()

      const step = () => {
        const now = performance.now()
        const dt = (now - lastTime) / 16
        lastTime = now
        vx *= Math.pow(decay, dt)
        vy *= Math.pow(decay, dt)
        viewport.scrollLeft -= vx * dt
        viewport.scrollTop -= vy * dt

        if (Math.hypot(vx, vy) > 0.5) {
          inertiaRef.current = requestAnimationFrame(step)
        } else {
          inertiaRef.current = null
        }
      }

      inertiaRef.current = requestAnimationFrame(step)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      if (inertiaRef.current) {
        cancelAnimationFrame(inertiaRef.current)
        inertiaRef.current = null
      }
    }
  }, [])

  const findClosestAvailableSpot = (preferredX: number, preferredY: number) => {
    const width = DEFAULT_OBJECT_SIZE.width
    const height = DEFAULT_OBJECT_SIZE.height

    const positions: { x: number; y: number; distance: number }[] = []
    for (let y = 0; y <= CANVAS_HEIGHT - height; y += GRID_SIZE) {
      for (let x = 0; x <= CANVAS_WIDTH - width; x += GRID_SIZE) {
        const dx = preferredX - x
        const dy = preferredY - y
        positions.push({ x, y, distance: Math.hypot(dx, dy) })
      }
    }

    positions.sort((a, b) => a.distance - b.distance)

    for (const pos of positions) {
      const candidate = {
        x: pos.x,
        y: pos.y,
        width,
        height
      }
      if (!isOverlapping(candidate, objectsRef.current)) {
        return { x: pos.x, y: pos.y }
      }
    }

    return null
  }

  const handleCanvasCreate = (x: number, y: number) => {
    const spot = findClosestAvailableSpot(x, y)
    if (!spot) {
      onStatus('No empty space available.')
      return
    }

    onCreate(spot, DEFAULT_OBJECT_SIZE, '')
  }

  const handleCanvasDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / canvasScale
    const y = (event.clientY - rect.top) / canvasScale
    handleCanvasCreate(x, y)
  }

  const handleCanvasPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    if (event.pointerType === 'touch') {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
      if (pointersRef.current.size === 2) {
        const [first, second] = Array.from(pointersRef.current.entries())
        const dx = first[1].x - second[1].x
        const dy = first[1].y - second[1].y
        const distance = Math.hypot(dx, dy)
        const rect = viewport.getBoundingClientRect()
        pinchRef.current = {
          pointerIds: [first[0], second[0]],
          startDistance: distance,
          startZoom: zoom,
          centerX: (first[1].x + second[1].x) / 2 - rect.left,
          centerY: (first[1].y + second[1].y) / 2 - rect.top
        }
        panStateRef.current = null
        viewport.style.cursor = ''
        return
      }

      const now = Date.now()
      const timeSince = now - lastTap
      setLastTap(now)
      if (timeSince < 300) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / canvasScale
        const y = (event.clientY - rect.top) / canvasScale
        handleCanvasCreate(x, y)
        return
      }
    }

    if (inertiaRef.current) {
      cancelAnimationFrame(inertiaRef.current)
      inertiaRef.current = null
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    panStateRef.current = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      originScrollLeft: viewport.scrollLeft,
      originScrollTop: viewport.scrollTop,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocityX: 0,
      velocityY: 0
    }
    viewport.style.cursor = 'grabbing'
  }

  const handleCanvasPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return
    const pointers = pointersRef.current
    if (!pointers.has(event.pointerId)) return
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const pinchState = pinchRef.current
    if (!pinchState) return
    const [firstId, secondId] = pinchState.pointerIds
    const first = pointers.get(firstId)
    const second = pointers.get(secondId)
    if (!first || !second) return
    const dx = first.x - second.x
    const dy = first.y - second.y
    const distance = Math.hypot(dx, dy)
    if (!distance) return
    const scaleFactor = distance / pinchState.startDistance
    const nextZoom = clamp(pinchState.startZoom * scaleFactor, MIN_ZOOM, MAX_ZOOM)
    updateZoom(nextZoom, pinchState.centerX, pinchState.centerY)
  }

  const handleCanvasPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size < 2) {
      pinchRef.current = null
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (WHEEL_SCROLL_ENABLED) return
    event.preventDefault()
    const rect = viewport.getBoundingClientRect()
    const focusX = event.clientX - rect.left
    const focusY = event.clientY - rect.top
    const nextZoom = zoom - event.deltaY * 0.0015
    updateZoom(nextZoom, focusX, focusY)
  }

  const handlePointerDownOnObject = (
    event: React.PointerEvent<HTMLDivElement>,
    obj: TextObject
  ) => {
    if (event.button !== 0) return
    if (
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLButtonElement
    ) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / canvasScale
    const relativeY = (event.clientY - rect.top) / canvasScale
    const marginX = obj.size.width * 0.1
    const marginY = obj.size.height * 0.1
    const withinPerimeter =
      relativeX <= marginX ||
      relativeX >= obj.size.width - marginX ||
      relativeY <= marginY ||
      relativeY >= obj.size.height - marginY

    if (!withinPerimeter) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    setDragState({
      id: obj.id,
      pointerId: event.pointerId,
      originX: obj.coordinates.x,
      originY: obj.coordinates.y,
      startX: event.clientX,
      startY: event.clientY
    })
  }

  const handleFabCreate = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2
    const centerY = viewport.scrollTop + viewport.clientHeight / 2
    handleCanvasCreate(
      centerX / canvasScale - DEFAULT_OBJECT_SIZE.width / 2,
      centerY / canvasScale - DEFAULT_OBJECT_SIZE.height / 2
    )
  }

  const handleCopyContent = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      onCopy(id, content)
      onStatus('Copied to clipboard.')
    } catch {
      onStatus('Copy failed.')
    }
  }

  return (
    <>
      <div className="absolute inset-0 pt-[73px]">
        <div
          ref={viewportRef}
          className="relative h-full w-full overflow-auto"
          onWheel={handleWheel}
        >
          <div
            className="relative cursor-grab bg-white active:cursor-grabbing dark:bg-zinc-950"
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${CANVAS_HEIGHT}px`,
              minWidth: `${CANVAS_WIDTH}px`,
              minHeight: `${CANVAS_HEIGHT}px`,
              transform: `scale(${canvasScale})`,
              transformOrigin: 'top left',
              touchAction: 'none'
            }}
            onDoubleClick={handleCanvasDoubleClick}
            onPointerDown={handleCanvasPointerDown}
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={handleCanvasPointerEnd}
            onPointerCancel={handleCanvasPointerEnd}
            onClick={(event) => {
              if (event.target !== event.currentTarget) return
              setSelectedId(null)
              setEditingId(null)
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgb(113 113 122 / 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(113 113 122 / 0.08) 1px, transparent 1px)
                `,
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
              }}
            />

            {objects.length === 0 && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white/90 px-6 py-4 text-center text-sm text-zinc-500 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-400">
                Double-click (or double-tap) to create a new text object.
              </div>
            )}

            {objects.map((obj) => {
              const isSelected = obj.id === selectedId
              const isHovered = obj.id === hoveredId
              const isDragging = dragState?.id === obj.id
              return (
                <div
                  key={obj.id}
                  className={`absolute rounded-lg border-2 bg-white p-4 shadow-sm transition-shadow dark:bg-zinc-900 ${
                    isSelected || isHovered || isDragging
                      ? 'border-zinc-800 shadow-lg dark:border-zinc-100'
                      : 'border-zinc-200 hover:shadow-lg dark:border-zinc-700'
                  }`}
                  style={{
                    left: `${obj.coordinates.x}px`,
                    top: `${obj.coordinates.y}px`,
                    width: `${obj.size.width}px`,
                    height: `${obj.size.height}px`
                  }}
                  onPointerEnter={() => setHoveredId(obj.id)}
                  onPointerLeave={() =>
                    setHoveredId((prev) => (prev === obj.id ? null : prev))
                  }
                  onPointerDown={(event) => handlePointerDownOnObject(event, obj)}
                  onClick={() => {
                    setSelectedId(obj.id)
                    setEditingId(obj.id)
                  }}
                >
                  <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>
                      {isDragging
                        ? 'Moving'
                        : isHovered
                          ? 'Drag edge to move'
                          : isSelected
                            ? 'Selected'
                            : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleCopyContent(obj.id, obj.content)
                        }}
                        className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onDelete(obj.id)
                        }}
                        className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={obj.content}
                    onChange={(event) => {
                      const next = event.target.value
                      onUpdate(obj.id, { content: next })
                    }}
                    onFocus={() => setEditingId(obj.id)}
                    onBlur={() => setEditingId(null)}
                    placeholder="Write something..."
                    className="h-[calc(100%-24px)] w-full resize-none rounded-md border border-transparent bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-zinc-200 focus:ring-0 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700"
                  />
                  {editingId === obj.id && (
                    <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                      Editing
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        title="Create new text object"
        onClick={handleFabCreate}
      >
        +
      </button>
    </>
  )
}
