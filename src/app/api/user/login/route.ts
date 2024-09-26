import jwt from "jsonwebtoken";

import { DB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  readDB();
  
  const body = await request.json();
  const {username, password} = body;
  const user_x = DB.users.find(
    (x:any) => username === body.username && password === body.password
  );
  if (!user_x) {
   return NextResponse.json(
     {
       ok: false,
       message: "Username or Password is incorrect",
     },
     { status: 400 }
   );
  }const token = "Replace this with token creation";

  return NextResponse.json({ ok: true, token });
};
