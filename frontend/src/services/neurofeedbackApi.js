const API_URL =
  "http://localhost:8000/api/neurofeedback";


export async function getNeurofeedback(
  focusProbability
) {

  const response = await fetch(
    `${API_URL}/feedback`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        focus_probability: focusProbability,
      }),
    }
  );


  if (!response.ok) {

    throw new Error(
      "Failed to get neurofeedback"
    );
  }


  return response.json();
}