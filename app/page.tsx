"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  interface task {
    id: number | null;
    title: string;
    createdAt: string | null;
  }

  const [tasks, setTasks] = useState<task[]>([]);

  const fetchAllTasks = async () => {
    const res = await fetch(`/api/task`, {
      method: "GET",
    });
    const data = await res.json();
    setTasks(data.tasks);
    console.log(data.tasks);
  };

  const postTask = async (title: string) => {
    const res = await fetch(`/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    fetchAllTasks();
    return await res.json();
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueRef.current?.value) {
      postTask(valueRef.current.value);
      valueRef.current.value = "";
    }
  };

  const valueRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={valueRef} />
        <button type="submit">タスク作成</button>
      </form>
      <button onClick={fetchAllTasks}>タスク取得</button>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            {task.id}:{task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
