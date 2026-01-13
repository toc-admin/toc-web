module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/toc/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/toc/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/toc/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
const createServerClient = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://vlwjarfujykmkcvfvlep.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsd2phcmZ1anlrbWtjdmZ2bGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMzgzMDIsImV4cCI6MjA4MTYxNDMwMn0.NgAueoAmsRhjtMei5Ixxx40a-1RvUYza_VbiJKFn_wQ"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
};
}),
"[project]/Desktop/toc/app/products/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/toc/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/toc/lib/supabase/server.ts [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './ProductDetailClient'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
async function getProductData(slug) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])();
    // Fetch complete product data with all relations
    const { data: product, error } = await supabase.from('products').select(`
      id,
      name,
      slug,
      sku,
      short_description,
      long_description,
      is_new,
      is_featured,
      datasheet_url,
      brand:brands(id, name, slug, logo_url),
      category:categories(id, name, slug),
      product_images(id, image_url, thumbnail_url, medium_url, is_primary, display_order),
      product_features(id, feature_name),
      product_colors(id, color_name, hex_code),
      product_specifications(id, spec_key, spec_value),
      product_certifications(id, certification_name),
      product_rooms!inner(room:rooms(id, name, slug))
    `).eq('slug', slug).is('deleted_at', null).single();
    if (error || !product) {
        console.error('Error fetching product:', error);
        return null;
    }
    // Fetch related products from same category
    const { data: relatedProducts } = await supabase.from('products').select(`
      id,
      name,
      slug,
      is_new,
      is_featured,
      brand:brands(name),
      category:categories(name),
      product_images(image_url, thumbnail_url, is_primary),
      product_features(feature_name)
    `).eq('category_id', product.category?.id).neq('id', product.id).is('deleted_at', null).limit(4);
    return {
        product,
        relatedProducts: relatedProducts || []
    };
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await getProductData(slug);
    if (!data?.product) {
        return {
            title: 'Product Not Found | The Office Company'
        };
    }
    const { product } = data;
    const primaryImage = product.product_images?.find((img)=>img.is_primary)?.image_url || product.product_images?.[0]?.image_url;
    return {
        title: `${product.name} | ${product.brand?.name || 'The Office Company'}`,
        description: product.short_description || product.long_description?.substring(0, 160),
        openGraph: {
            title: `${product.name} | ${product.brand?.name}`,
            description: product.short_description || '',
            images: primaryImage ? [
                {
                    url: primaryImage,
                    width: 800,
                    height: 600,
                    alt: product.name
                }
            ] : [],
            type: 'website'
        }
    };
}
async function ProductPage({ params }) {
    const { slug } = await params;
    const data = await getProductData(slug);
    if (!data?.product) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$toc$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductDetailClient, {
        product: data.product,
        relatedProducts: data.relatedProducts
    }, void 0, false, {
        fileName: "[project]/Desktop/toc/app/products/[slug]/page.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
}),
"[project]/Desktop/toc/app/products/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/toc/app/products/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__abc259a6._.js.map