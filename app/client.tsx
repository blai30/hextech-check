import { hydrateStart } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

hydrateStart().then((router) => {
  const rootEl = document.getElementById('root')!
  hydrateRoot(
    rootEl,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
