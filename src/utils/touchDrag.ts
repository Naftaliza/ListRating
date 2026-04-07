// Shared drag state for pointer-based drag-and-drop (works on mobile + desktop)
import type { DragData } from '../types/pokemon'

let activeDrag: DragData | null = null
let ghostEl: HTMLElement | null = null

export function getActiveDrag() { return activeDrag }

export function startDrag(data: DragData, imgSrc: string, x: number, y: number) {
  activeDrag = data
  const img = document.createElement('img')
  img.src = imgSrc
  ghostEl = img as unknown as HTMLElement
  ghostEl.style.cssText = `
    position: fixed; pointer-events: none; z-index: 99999;
    width: 60px; height: 60px; object-fit: contain;
    opacity: 0.85; transform: translate(-50%, -50%) scale(1.2);
    image-rendering: pixelated;
    left: ${x}px; top: ${y}px;
  `
  document.body.appendChild(ghostEl)
}

export function moveDrag(x: number, y: number) {
  if (ghostEl) {
    ghostEl.style.left = `${x}px`
    ghostEl.style.top = `${y}px`
  }
}

export function endDrag(x: number, y: number): DragData | null {
  const data = activeDrag
  activeDrag = null

  if (ghostEl) {
    ghostEl.style.display = 'none'
    // Find element under the ghost
    const target = document.elementFromPoint(x, y)
    ghostEl.style.display = ''
    ghostEl.remove()
    ghostEl = null

    if (target && data) {
      // Walk up DOM to find drop zone
      let el: Element | null = target
      while (el) {
        const tierId = el.getAttribute('data-tier-id')
        if (tierId) {
          el.dispatchEvent(new CustomEvent('touchdrop', { bubbles: false, detail: { data, tierId } }))
          return data
        }
        if (el.getAttribute('data-pool-zone') === 'true') {
          el.dispatchEvent(new CustomEvent('touchdrop', { bubbles: false, detail: { data, pool: true } }))
          return data
        }
        el = el.parentElement
      }
    }
  }
  return data
}
