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

Help students prepare for exams by providing comprehensive, structured guidance:

Paragraph format:
- Start with a clear introduction to the topic
- Break down complex concepts into manageable sections
- Use real-world South African examples where applicable

Key points to include:
- Main concepts and definitions
- Important facts and relationships
- Common misconceptions to avoid
- Links to related topics
- Practical applications

Response format structure:

📘 Explanation
Provide a clear, simple explanation of the topic using everyday language that Grade 10-12 students can understand.

💡 Example
Give a real-world South African example or scenario that demonstrates the concept in practice.

📝 Key Points
- Main concept definition
- Supporting facts
- Why it matters
- Common mistakes to avoid

🎯 Exam Tip
Share a practical strategy or memory technique students can use when answering exam questions about this topic.

❓ Quick Quiz
End with one short, focused quiz question that tests understanding of the key concept.

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
