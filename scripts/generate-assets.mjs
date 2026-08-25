import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const outputDir = join(process.cwd(), 'public')

await mkdir(outputDir, { recursive: true })

const heroSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1200" viewBox="0 0 1920 1200">
  <defs>
    <filter id="shadow" x="-30%" y="-30%" width="180%" height="180%">
      <feDropShadow dx="18" dy="24" stdDeviation="18" flood-color="#171714" flood-opacity="0.2"/>
    </filter>
    <pattern id="grain" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="3" r="0.7" fill="#171714" opacity="0.08"/>
      <circle cx="9" cy="8" r="0.6" fill="#ffffff" opacity="0.28"/>
    </pattern>
  </defs>
  <rect width="1920" height="1200" fill="#d7d4ca"/>
  <rect width="1920" height="1200" fill="url(#grain)"/>
  <path d="M1090 0H1920V1200H820Z" fill="#c7c4ba" opacity="0.58"/>
  <g filter="url(#shadow)" transform="translate(1120 90) rotate(7)">
    <rect width="620" height="890" rx="7" fill="#f7f5ee" stroke="#252521" stroke-width="3"/>
    <rect x="48" y="50" width="185" height="18" fill="#171714"/>
    <rect x="48" y="86" width="410" height="7" fill="#a5a399"/>
    <rect x="48" y="106" width="325" height="7" fill="#c6c3b9"/>
    <g stroke="#8c8a80" stroke-width="3" fill="none">
      <rect x="70" y="190" width="160" height="86"/>
      <rect x="365" y="190" width="160" height="86"/>
      <rect x="218" y="372" width="160" height="86"/>
      <path d="M230 233H365M445 276V330H298V372"/>
    </g>
    <g fill="#c9f43a" stroke="#171714" stroke-width="3">
      <circle cx="230" cy="233" r="10"/>
      <circle cx="365" cy="233" r="10"/>
      <circle cx="445" cy="330" r="10"/>
      <circle cx="298" cy="372" r="10"/>
    </g>
    <g fill="#d4d1c7">
      <rect x="48" y="535" width="515" height="8"/>
      <rect x="48" y="568" width="438" height="8"/>
      <rect x="48" y="601" width="486" height="8"/>
      <rect x="48" y="634" width="376" height="8"/>
      <rect x="48" y="705" width="515" height="8"/>
      <rect x="48" y="738" width="456" height="8"/>
    </g>
    <rect x="486" y="-15" width="88" height="54" fill="#c9f43a"/>
    <circle cx="510" cy="790" r="66" fill="none" stroke="#ef5637" stroke-width="10" opacity="0.9"/>
    <path d="M471 790H549M510 751V829" stroke="#ef5637" stroke-width="8" opacity="0.9"/>
  </g>
  <g filter="url(#shadow)" transform="translate(840 290) rotate(-9)">
    <rect width="470" height="650" rx="5" fill="#eceae2" stroke="#383832" stroke-width="3"/>
    <rect x="38" y="42" width="145" height="16" fill="#171714"/>
    <g stroke="#6d6b64" stroke-width="3" fill="none">
      <rect x="50" y="135" width="118" height="66"/>
      <rect x="300" y="135" width="118" height="66"/>
      <rect x="174" y="293" width="118" height="66"/>
      <path d="M168 168H300M359 201V250H233V293"/>
    </g>
    <g fill="#171714">
      <rect x="50" y="444" width="350" height="6"/>
      <rect x="50" y="474" width="302" height="6" opacity="0.45"/>
      <rect x="50" y="504" width="326" height="6" opacity="0.45"/>
      <rect x="50" y="534" width="244" height="6" opacity="0.45"/>
    </g>
    <rect x="-14" y="510" width="74" height="46" fill="#ef5637"/>
  </g>
  <g transform="translate(1505 845) rotate(-23)">
    <rect width="305" height="50" rx="3" fill="#171714"/>
    <g stroke="#efeee8" stroke-width="2" opacity="0.55">
      <path d="M28 0V18M58 0V28M88 0V18M118 0V28M148 0V18M178 0V28M208 0V18M238 0V28M268 0V18"/>
    </g>
  </g>
  <g transform="translate(1000 1010) rotate(15)">
    <rect width="420" height="38" rx="19" fill="#ef5637"/>
    <rect x="352" y="4" width="66" height="30" rx="15" fill="#171714"/>
  </g>
  <path d="M1220 1040C1390 950 1500 1010 1680 940" fill="none" stroke="#171714" stroke-width="5" stroke-dasharray="12 16" opacity="0.48"/>
  <circle cx="1220" cy="1040" r="10" fill="#c9f43a" stroke="#171714" stroke-width="4"/>
  <circle cx="1680" cy="940" r="10" fill="#ef5637" stroke="#171714" stroke-width="4"/>
</svg>`

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#efeee8"/>
  <rect x="0" y="0" width="26" height="630" fill="#c9f43a"/>
  <rect x="80" y="76" width="76" height="76" fill="#c9f43a"/>
  <text x="118" y="126" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="700" fill="#171714">ai</text>
  <text x="80" y="220" font-family="sans-serif" font-size="25" font-weight="600" fill="#4f4e48">AI员工设计顾问</text>
  <text x="80" y="322" font-family="serif" font-size="61" font-weight="700" fill="#171714">把重复工作，</text>
  <text x="80" y="400" font-family="serif" font-size="61" font-weight="700" fill="#171714">变成可交接的 AI 岗位。</text>
  <text x="80" y="510" font-family="sans-serif" font-size="26" font-weight="600" fill="#171714">aidesign</text>
  <text x="80" y="552" font-family="sans-serif" font-size="17" fill="#66645e">READ-ONLY AGENT EXPERIENCE</text>
  <g transform="translate(835 104) rotate(5)">
    <rect width="275" height="410" fill="#ffffff" stroke="#171714" stroke-width="3"/>
    <rect x="30" y="34" width="110" height="14" fill="#171714"/>
    <rect x="30" y="74" width="210" height="6" fill="#b9b7ae"/>
    <rect x="30" y="98" width="170" height="6" fill="#d0cec5"/>
    <rect x="40" y="160" width="74" height="50" fill="none" stroke="#78766e" stroke-width="3"/>
    <rect x="164" y="160" width="74" height="50" fill="none" stroke="#78766e" stroke-width="3"/>
    <path d="M114 185H164M201 210V248H139V280" fill="none" stroke="#78766e" stroke-width="3"/>
    <rect x="99" y="280" width="80" height="52" fill="#c9f43a" stroke="#171714" stroke-width="3"/>
    <circle cx="218" cy="350" r="36" fill="none" stroke="#ef5637" stroke-width="7"/>
  </g>
</svg>`

await sharp(Buffer.from(heroSvg)).webp({ quality: 92 }).toFile(join(outputDir, 'hero-worktable.webp'))
await sharp(Buffer.from(ogSvg)).png().toFile(join(outputDir, 'og-cover.png'))

