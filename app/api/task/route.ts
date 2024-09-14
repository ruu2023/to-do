import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { title } = await req.json(); // リクエストのボディからデータを取得
    const task = await prisma.task.create({
      data: {
        title: title || "デフォルトタイトル",
      },
    });
    return NextResponse.json({ message: "Task created successfully", task });
  } catch (err) {
    console.error("Error creating task:", err);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ message: "Success", tasks }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect; //最後に必ずprismaとの接続を切る
  }
};
