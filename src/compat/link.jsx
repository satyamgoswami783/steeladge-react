import React from "react";
import { Link as RouterLink } from "react-router-dom";
export const Link = React.forwardRef(function Link({ href, prefetch, replace, scroll, shallow, passHref, children, onClick, ...rest }, ref) {
    const isExternal = href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("//");
    if (isExternal) {
        return (<a ref={ref} href={href} onClick={onClick} {...rest}>
        {children}
      </a>);
    }
    const handleClick = (e) => {
        if (onClick)
            onClick(e);
        if (scroll !== false && !e.defaultPrevented) {
            if (href.includes("#")) {
                const id = href.split("#")[1];
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }
            else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };
    return (<RouterLink ref={ref} to={href} replace={replace} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>);
});
export default Link;
