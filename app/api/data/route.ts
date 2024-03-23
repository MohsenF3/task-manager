import { auth } from "@/auth";
import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    // if no session found(user not exist)
    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    // find the task of the user
    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
