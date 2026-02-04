import React, { Children } from 'react'

const BorderAnimatedContainer = () => {
  return (
    <div
  className="w-full max-w-[422px]
  [background:
    linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,
    conic-gradient(
      from_var(--border-angle),
      theme(colors.slate.600/.48)_80%,
      theme(colors.indigo.500)_86%,
      theme(colors.indigo.300)_90%,
      theme(colors.indigo.500)_94%,
      theme(colors.slate.600/.48)
    )_border-box
  ]
  rounded-2xl
  border border-transparent
  animate-border"
>
  {Children}
</div>

  )
}

export default BorderAnimatedContainer