import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
