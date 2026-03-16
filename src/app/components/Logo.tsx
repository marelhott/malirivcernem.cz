/**
 * Logo component for "Malíři v černém"
 * Pure inline SVG – no external asset dependencies.
 * Features a paint roller icon + company name.
 */

export function LogoDark({ className = "h-8 md:h-9 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paint roller icon */}
      <rect x="4" y="6" width="20" height="12" rx="3" fill="#c9982d" />
      <rect x="12" y="18" width="2" height="10" rx="1" fill="#0a0a0f" />
      <rect x="9" y="28" width="8" height="4" rx="2" fill="#0a0a0f" />
      {/* Company name */}
      <text x="32" y="18" fontFamily="'Forma DJR Display', 'Space Grotesk', system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#0a0a0f" letterSpacing="-0.02em">
        Malíři v černém
      </text>
      <text x="32" y="32" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="400" fontSize="9" fill="#0a0a0f" opacity="0.4" letterSpacing="0.06em">
        PROFESIONÁLNÍ MALÍŘI
      </text>
    </svg>
  );
}

export function LogoLight({ className = "h-8 md:h-9 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="20" height="12" rx="3" fill="#c9982d" />
      <rect x="12" y="18" width="2" height="10" rx="1" fill="#f5f0eb" />
      <rect x="9" y="28" width="8" height="4" rx="2" fill="#f5f0eb" />
      <text x="32" y="18" fontFamily="'Forma DJR Display', 'Space Grotesk', system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#f5f0eb" letterSpacing="-0.02em">
        Malíři v černém
      </text>
      <text x="32" y="32" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="400" fontSize="9" fill="#f5f0eb" opacity="0.4" letterSpacing="0.06em">
        PROFESIONÁLNÍ MALÍŘI
      </text>
    </svg>
  );
}

// Data URI versions for backwards-compatible img src usage
const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 40"><rect x="4" y="6" width="20" height="12" rx="3" fill="%23c9982d"/><rect x="12" y="18" width="2" height="10" rx="1" fill="%230a0a0f"/><rect x="9" y="28" width="8" height="4" rx="2" fill="%230a0a0f"/><text x="32" y="18" font-family="Space Grotesk,system-ui,sans-serif" font-weight="700" font-size="15" fill="%230a0a0f" letter-spacing="-0.02em">Malíři v černém</text><text x="32" y="32" font-family="Space Grotesk,system-ui,sans-serif" font-weight="400" font-size="9" fill="%230a0a0f" opacity="0.4" letter-spacing="0.06em">PROFESIONÁLNÍ MALÍŘI</text></svg>`;
const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 40"><rect x="4" y="6" width="20" height="12" rx="3" fill="%23c9982d"/><rect x="12" y="18" width="2" height="10" rx="1" fill="%23f5f0eb"/><rect x="9" y="28" width="8" height="4" rx="2" fill="%23f5f0eb"/><text x="32" y="18" font-family="Space Grotesk,system-ui,sans-serif" font-weight="700" font-size="15" fill="%23f5f0eb" letter-spacing="-0.02em">Malíři v černém</text><text x="32" y="32" font-family="Space Grotesk,system-ui,sans-serif" font-weight="400" font-size="9" fill="%23f5f0eb" opacity="0.4" letter-spacing="0.06em">PROFESIONÁLNÍ MALÍŘI</text></svg>`;

export const logoDarkUrl = "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F349ca57e962542a29d1bae5d180268bd";
export const logoLightUrl = "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F1033b565b9b2400284607f0fc2d667a4";
