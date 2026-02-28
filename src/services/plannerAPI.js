export async function generatePlanner(wake, sleep) {
  const response = await fetch("http://127.0.0.1:8000/generate-planner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wake_time: wake,
      sleep_time: sleep
    }),
  });

  return response.json();
}