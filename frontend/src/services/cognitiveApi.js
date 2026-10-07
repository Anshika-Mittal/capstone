const API_BASE_URL =
  "http://localhost:8000";

export async function submitAssessment(results) {
  const response = await fetch(
    `${API_BASE_URL}/api/cognitive/session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to submit assessment"
    );
  }

  return response.json();
}
