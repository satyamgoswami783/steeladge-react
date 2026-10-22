import { useLocation, useNavigate, useParams, useSearchParams as useRouterSearchParams } from "react-router-dom";
export function usePathname() {
    const location = useLocation();
    return location.pathname;
}
export function useRouter() {
    const navigate = useNavigate();
    return {
        push: (url) => navigate(url),
        replace: (url) => navigate(url, { replace: true }),
        back: () => navigate(-1),
        forward: () => navigate(1),
        prefetch: () => { },
        refresh: () => window.location.reload(),
    };
}
export function useSearchParams() {
    const [searchParams] = useRouterSearchParams();
    return searchParams;
}
export function notFound() {
    throw new Error("NEXT_NOT_FOUND");
}
export { useParams };
