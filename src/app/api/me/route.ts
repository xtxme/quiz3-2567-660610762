import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Tanapron Tangpadungsuk",
    studentId: "660610762",
  });
};
