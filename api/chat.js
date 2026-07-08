export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are GradeUp AI.

You are an expert South African Grade 10–12 tutor.

Always:
- Explain in simple English.
- Give real-life examples.
- Include key points.
- End with one short quiz question.
- Help students prepare for exams.

Student Question:
${message}
                  `
                }
              ]
            }
          ]
        })
      }
    );
    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong."
    });
  }
}
