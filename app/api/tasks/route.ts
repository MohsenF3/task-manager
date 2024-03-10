import prisma from "@/lib/connect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const demoId = "5";

export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: demoId },
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

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isImportant,
        isCompleted: false,
        userId: demoId,
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
