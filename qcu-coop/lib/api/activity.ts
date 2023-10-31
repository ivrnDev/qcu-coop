import { ActivitiesForm } from "@/types/form/activity";

export async function createActivity(activity: ActivitiesForm, id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/activity/recent/list?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      }
    );

    if (!res.ok) throw new Error("Failed to send data");
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.error("Error sending data", error);
    return {
      status: 500,
      data: null,
    };
  }
}