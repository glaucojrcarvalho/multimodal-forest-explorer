import { NextResponse } from "next/server";
import { getKartverketContextImage } from "../../../../lib/kartverket-image";

export const revalidate = 86400;

export async function GET() {
  try {
    const image = await getKartverketContextImage("dtm");

    return new NextResponse(image.bytes, {
      status: 200,
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      }
    });
  } catch (error) {
    console.error("Kartverket DTM context failed", error);
    return NextResponse.json(
      { error: "Kartverket elevation context is temporarily unavailable." },
      { status: 502 }
    );
  }
}
