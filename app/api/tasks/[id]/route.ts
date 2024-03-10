import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: await req.json(),
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error While Deleting Task", error);
    return NextResponse.json({
      error: "Error While Deleting Task",
      status: 500,
    });
  }
}
