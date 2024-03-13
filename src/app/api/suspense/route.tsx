import { NextResponse, NextRequest } from 'next/server';

export async function GET( request: NextRequest,) {
	const time = Number(request.nextUrl.searchParams.get("time"));
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, time);
	});
	return NextResponse.json({ message: "성공" });
}
