document.getElementById('generateButton').addEventListener('click', function() {
    const goal = document.getElementById('goal').value.trim();
    const knowledgeLevel = document.getElementById('knowledgeLevel').value.trim();
    const skills = document.getElementById('skills').value
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
    const objective = document.getElementById('objective').value.trim();

    if (!goal || !knowledgeLevel || skills.length === 0 || !objective) {
        document.getElementById('output').innerHTML = "<p>Please fill out all fields.</p>";
        return;
    }

    document.getElementById('output').innerHTML = "<p>Generating your learning path...</p>";
    generateLearningPath(goal, knowledgeLevel, skills, objective);
});

async function generateLearningPath(goal, knowledgeLevel, skills, objective) {
    const prompt = `
Generate a brief, beginner-friendly learning path (5-7 steps) for someone whose goal is "${goal}".
Their knowledge level is "${knowledgeLevel}".
Their current skills include: ${skills.join(", ")}.
Their objective is: "${objective}".
Keep it short and practical.
    `;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key= PUT_OUR_API_KEY_HERE",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            }
        );

        const data = await response.json();
        if (response.ok && data && data.candidates && data.candidates.length > 0) {
            const generatedPath = data.candidates[0].content.parts[0].text.trim();
            // Try to format as a list if possible
            const steps = generatedPath.split('\n').filter(line => line.trim().length > 0);
            if (steps.length > 1) {
                document.getElementById('output').innerHTML = `<ul>${steps.map(step => `<li>${step.replace(/^\d+\.\s*/, '')}</li>`).join('')}</ul>`;
            } else {
                document.getElementById('output').innerHTML = `<p>${generatedPath.replace(/\n/g, "<br>")}</p>`;
            }
        } else {
            document.getElementById('output').innerHTML = `<p>Error generating learning path. Please try again later.</p>`;
        }
    } catch (error) {
        document.getElementById('output').innerHTML = `<p>Network error occurred: ${error.message}. Please try again later.</p>`;
    }
}

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('goal').value = '';
    document.getElementById('knowledgeLevel').selectedIndex = 0;
    document.getElementById('skills').value = '';
    document.getElementById('objective').value = '';
    document.getElementById('output').innerHTML = '';
});
