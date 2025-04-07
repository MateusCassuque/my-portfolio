'use client'

import { useEffect, useState } from 'react'

export default function CalEmbed() {

  return (
    <iframe
      src="https://cal.com/mateus-cassuque/meeting-de-ebertura-de-projecto?embed=true"
      width="100%"
      height="700"
      style={{
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
      }}
      loading="lazy"
    ></iframe>
  )
}