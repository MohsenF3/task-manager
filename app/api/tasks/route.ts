import { auth } from "@/auth";
import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: session?.user?.id },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error While Getting Task", error);
    return NextResponse.json({
      error: "Error While Getting Task",
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, date, isImportant } = await req.json();
    const session = await auth();

    if (!session) {
      return new Response("Not authenticated", { status: 401 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isImportant,
        isCompleted: false,
        userId: session?.user?.id as string,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error While Creating Task", error);
    return NextResponse.json({
      error: "Error While Creating Task",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, isCompleted } = await req.json();

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted: isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error While Updating Task", error);
    return NextResponse.json({
      error: "Error While Updating Task",
      status: 500,
    });
  }
}
