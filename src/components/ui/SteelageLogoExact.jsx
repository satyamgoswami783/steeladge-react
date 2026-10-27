export function SteelageLogoExact({ className = "", width = "auto", height = "100%", variant = "dark", withWhiteBg = false, }) {
    const isBadge = variant === "badge" || withWhiteBg;
    const logoSrc = isBadge 
      ? "/logo-badge.png" 
      : (variant === "light" ? "/logo-transparent-light.png" : "/logo-transparent.png");

    return (<div className={`relative inline-flex items-center justify-center ${isBadge ? "bg-white p-2 rounded-md shadow-sm" : ""} ${className}`} style={{ width, height }}>
      <img src={logoSrc} alt="Steelage Construction Ltd Logo" className="h-full w-auto max-h-full object-contain" style={{ height: height === "auto" ? "100%" : height }}/>
    </div>);
}
