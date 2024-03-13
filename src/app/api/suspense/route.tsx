import { NextResponse } from 'next/server';

export async function GET() {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, 5000);
	});
	return NextResponse.json({ message: "성공" });
}
