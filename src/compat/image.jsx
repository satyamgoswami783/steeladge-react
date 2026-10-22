import React from "react";
export const Image = React.forwardRef(function Image({ src, alt = "", width, height, fill = false, priority = false, quality, sizes, placeholder, blurDataURL, unoptimized, className = "", style = {}, loading, decoding = "async", ...rest }, ref) {
    const resolvedSrc = typeof src === "string" ? src : src?.src || "";
    const imageStyle = fill
        ? {
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            ...style,
        }
        : {
            ...style,
        };

    const effectiveLoading = priority ? "eager" : (loading || "eager");
    return (<img ref={ref} src={resolvedSrc} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} loading={effectiveLoading} decoding={decoding} sizes={sizes} className={className} style={imageStyle} {...rest}/>);
});
export default Image;
