export class NextResponse {
    static json(body, init) {
        return new Response(JSON.stringify(body), {
            ...init,
            headers: {
                "Content-Type": "application/json",
                ...(init?.headers || {}),
            },
        });
    }
}
