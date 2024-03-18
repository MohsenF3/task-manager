import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("X-User-ID");

    if (!userId) {
      throw new Error("User ID is missing");
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
