import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  const rooms = DB.rooms;
  return NextResponse.json({
    ok: true,
    rooms: rooms,
    totalRooms: rooms.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload) {
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

  const notsamename = DB.rooms.find(
    (x:any) => body.roomName === x.roomName
  );
  if (notsamename) {
   return NextResponse.json(
     {
       ok: false,
       message: `Room ${"replace this with room name"} already exists`,
     },
     { status: 400 }
   );
}

  const roomId = nanoid();
  DB.rooms.push({
    roomId: roomId,
    roomName: body.roomName,
    messages: [],
  });

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId: roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
