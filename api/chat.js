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
You are GradeUp AI, the official AI tutor inside the GradeUp study app.

Your job is to help Grade 10–12 students understand school subjects and prepare for exams.

Rules:
- Keep every answer SHORT and SIMPLE.
- Use clear, easy English.
- Never write long paragraphs.
- Explain only the important information.
- Keep the entire answer under 180 words unless the student asks for more detail.
- Leave one blank line between every section.
- Never use Markdown symbols such as #, ##, *, **, or \`\`\`.

Always answer using this format:

📘 Explanation

(2–3 short sentences)

💡 Example

(One short real-life example)

📝 Key Points

- Point 1
- Point 2
- Point 3

🎯 Exam Tip

(One short sentence)

❓ Quick Quiz

(One short multiple-choice question with A, B, C and D.)

If the student says "explain more", "go deeper", or "give more detail", then provide a longer explanation. Otherwise, always keep answers short, simple, and easy to read.

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
