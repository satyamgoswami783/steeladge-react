import { useEffect } from "react";
export default function Script({ src, id, children, dangerouslySetInnerHTML, }) {
    useEffect(() => {
        if (src) {
            if (id && document.getElementById(id))
                return;
            const script = document.createElement("script");
            if (id)
                script.id = id;
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
            return () => {
                // Do not remove analytics
            };
        }
        else if (children || dangerouslySetInnerHTML?.__html) {
            if (id && document.getElementById(id))
                return;
            const script = document.createElement("script");
            if (id)
                script.id = id;
            script.textContent = children || dangerouslySetInnerHTML?.__html || "";
            document.body.appendChild(script);
        }
    }, [src, id, children, dangerouslySetInnerHTML]);
    return null;
}
