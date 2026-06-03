(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/SmoothScroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SmoothScroll() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                lerp: 0.075,
                wheelMultiplier: 0.95,
                smoothWheel: true
            });
            let raf = 0;
            const loop = {
                "SmoothScroll.useEffect.loop": (time)=>{
                    lenis.raf(time);
                    raf = requestAnimationFrame(loop);
                }
            }["SmoothScroll.useEffect.loop"];
            raf = requestAnimationFrame(loop);
            // smooth in-page anchor navigation
            const onClick = {
                "SmoothScroll.useEffect.onClick": (e)=>{
                    const link = e.target.closest('a[href^="#"]');
                    if (!link) return;
                    const id = link.getAttribute("href");
                    if (!id || id === "#") return;
                    const target = document.querySelector(id);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, {
                            offset: -80
                        });
                    }
                }
            }["SmoothScroll.useEffect.onClick"];
            document.addEventListener("click", onClick);
            return ({
                "SmoothScroll.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    document.removeEventListener("click", onClick);
                    lenis.destroy();
                }
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], []);
    return null;
}
_s(SmoothScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_SmoothScroll_tsx_0fitjda._.js.map