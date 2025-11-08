const API_URL = "http://localhost:5000/api";

export async function fetchQuestions(field: string, count: number) {
  const res = await fetch(`${API_URL}/questions?profession=${field}&count=${count}`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function estimateAnswers(answers: { question: string; answer: string }[]) {
  const res = await fetch(`${API_URL}/estimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("Failed to evaluate answers");
  return res.json();
}
