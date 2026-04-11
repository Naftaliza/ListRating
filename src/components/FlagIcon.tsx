import type { Lang } from '../i18n'

function FlagIL() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 6, borderRadius: 2, flexShrink: 0 }}>
      <rect width="20" height="14" fill="#fff" />
      <rect y="1.8" width="20" height="2.2" fill="#0038b8" />
      <rect y="10" width="20" height="2.2" fill="#0038b8" />
      {/* Star of David */}
      <polygon points="10,4.8 11.3,7 12.6,7 11.3,9.2 10,7 8.7,9.2 7.4,7 8.7,7" fill="none" stroke="#0038b8" strokeWidth="0.7" />
      <polygon points="10,9.2 8.7,7 7.4,7 8.7,4.8 10,7 11.3,4.8 12.6,7 11.3,7" fill="none" stroke="#0038b8" strokeWidth="0.7" />
    </svg>
  )
}

function FlagUS() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 6, borderRadius: 2, flexShrink: 0 }}>
      {/* Stripes */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
        <rect key={i} y={i * (14/13)} width="20" height={14/13} fill={i % 2 === 0 ? '#B22234' : '#fff'} />
      ))}
      {/* Canton */}
      <rect width="8" height="7.7" fill="#3C3B6E" />
      {/* Stars — simplified as dots */}
      {[0,1,2,3,4].map(row =>
        [0,1,2,3,4,5].slice(0, row % 2 === 0 ? 6 : 5).map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={row % 2 === 0 ? 0.7 + col * 1.3 : 1.35 + col * 1.3}
            cy={0.9 + row * 1.5}
            r="0.38"
            fill="#fff"
          />
        ))
      )}
    </svg>
  )
}

export default function FlagIcon({ lang }: { lang: Lang }) {
  // Show the flag of the language you'd switch TO
  return lang === 'en' ? <FlagIL /> : <FlagUS />
}
