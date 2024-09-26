import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();

  const id =request.nextUrl.searchParams.get("roomId");

  const roomisfound = DB.rooms.find(
    (x:any) => x.roomId === id
  );
  if (!roomisfound) {
   return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );
  }
};

export const POST = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const roomisfound = DB.rooms.find(
    (x:any) => x.roomId === body.roomId
  );

  if (!roomisfound) {
   return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );
  }
  const messageId = nanoid();
  DB.Message.push({
    roomId: body.roomId,
    messageText: body.messageText,
    messageId: messageId,
  });
  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  console.log(payload);
  if (payload !== "SUPER_ADMIN") {
   return NextResponse.json(
     {
       ok: false,
       message: "Invalid token",
     },
     { status: 401 }
   );
  }
  readDB();
  const body = await request.json();
  const foundmessageId = DB.message.findIndex(
    (x:any) => x.messageId === body.messageId
  );
  if (foundmessageId === -1) {

  return NextResponse.json(
     {
       ok: false,
       message: "Message is not found",
     },
     { status: 404 }
   );

  }
  DB.messages.splice(foundmessageId, 1);
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
