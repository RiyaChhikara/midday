import { createMiddlewareClient } from "@midday/supabase";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
	locales: ["en", "sv"],
	defaultLocale: "en",
	urlMappingStrategy: "rewrite",
});

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	await supabase.auth.getSession();

	return I18nMiddleware(req);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
