# 📚 Learning Path Generator

An AI-powered web application that generates personalized learning paths based on your goals, skills, and experience level. Built using vanilla HTML, CSS, and JavaScript, and integrated with Google's Gemini API.

---

## ✨ Features

- Enter your career or learning goal (e.g., "Become a front-end developer")
- Choose your knowledge level (beginner, intermediate, advanced)
- Add your current skills and learning objectives
- Get a structured, beginner-friendly learning plan in seconds

---

## 🖼 Demo

Here’s a quick preview of the app in action:

![Demo](./demo.gif)

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **API**: Google Gemini (v1beta - Flash model)
- **Model Integration**: Text-generation API called via `fetch()` with carefully structured prompts

---

## 🧠 Prompt Engineering Highlight

```text
Generate a brief, beginner-friendly learning path (5–7 steps) for someone whose goal is "${goal}". Their knowledge level is "${knowledgeLevel}". Their current skills include: ${skills}. Their objective is: "${objective}". Keep it short and practical.
