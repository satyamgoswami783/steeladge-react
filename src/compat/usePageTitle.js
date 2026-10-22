import { useEffect } from "react";
export function usePageTitle(title, description) {
    useEffect(() => {
        if (title) {
            document.title = title.includes("Steelage") ? title : `${title} | Steelage Construction`;
        }
        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement("meta");
                metaDesc.setAttribute("name", "description");
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute("content", description);
        }
    }, [title, description]);
}
