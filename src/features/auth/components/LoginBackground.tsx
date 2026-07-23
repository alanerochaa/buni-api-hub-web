const NETWORK_NODES = [
  { x: 70, y: 70 },
  { x: 190, y: 40 },
  { x: 150, y: 190 },
  { x: 730, y: 60 },
  { x: 620, y: 150 },
  { x: 760, y: 230 },
  { x: 70, y: 470 },
  { x: 190, y: 560 },
  { x: 730, y: 520 },
  { x: 630, y: 450 },
]

const NETWORK_EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 2],
  [3, 4],
  [4, 5],
  [3, 5],
  [6, 7],
  [8, 9],
  [2, 6],
  [4, 9],
]

function NetworkPattern() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="white" strokeOpacity="0.05" strokeWidth="1">
        {NETWORK_EDGES.map(([a, b], index) => (
          <line
            key={index}
            x1={NETWORK_NODES[a].x}
            y1={NETWORK_NODES[a].y}
            x2={NETWORK_NODES[b].x}
            y2={NETWORK_NODES[b].y}
          />
        ))}
      </g>
      <g fill="white" fillOpacity="0.18">
        {NETWORK_NODES.map((node, index) => (
          <circle key={index} cx={node.x} cy={node.y} r={index % 3 === 0 ? 2.5 : 1.8} />
        ))}
      </g>
    </svg>
  )
}

export function LoginBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(94,195,242,0.08),transparent_50%)]" />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <NetworkPattern />

      <div className="bg-brand-300 absolute -top-24 -left-20 size-96 rounded-full opacity-[0.14] blur-3xl" />
      <div className="bg-brand-600 absolute top-1/3 -right-24 size-[28rem] rounded-full opacity-[0.14] blur-3xl" />
      <div className="bg-brand-300 absolute -bottom-32 left-1/4 size-80 rounded-full opacity-[0.07] blur-3xl" />

      <div className="absolute top-16 right-16 size-40 rotate-12 rounded-3xl border border-white/[0.06]" />
      <div className="absolute bottom-24 left-10 size-28 -rotate-12 rounded-2xl border border-white/[0.06]" />

      <div className="from-brand-950/30 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  )
}
