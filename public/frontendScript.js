const inputText = document.getElementById("userInput")
const btn = document.getElementById('submit')
const geminiResponseContainer = document.getElementById('geminiResponse')

function formatAIText(text) {
  return text
    .replace(/\\n/g, '<br>')                       // Newlines to <br>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold: **text**
    .replace(/\*(.*?)\*/g, '<em>$1</em>')        // Italic: *text*
    .replace(/"/g, '');
}

btn.addEventListener('click', async () => {
    const inputText = document.getElementById("userInput")
    const userQuery = inputText.value.trim()
    const body = document.body
    // console.log(userQuery)
    try {
        // Use fetch to send the data to your backend
        const response = await fetch('/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userQuery }),
        });

        // if (!response.ok) {
        //   geminiResponseContainer.textContent = response.status
        //   throw new Error('Network response was not ok: ' + response.status);
        // }

        // Get the response text (or JSON if your server returns JSON)
        const data = await response.text();
        geminiResponseContainer.innerHTML = formatAIText(data);
        body.style.display = "block";
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('Error: ' + error.message);
      }
})