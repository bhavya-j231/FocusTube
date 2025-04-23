let player;

function loadVideo() {
  let input = document.getElementById("videoIdInput").value.trim();

  const videoIdMatch = input.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);

  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    player.loadVideoById(videoId);
  } else if (input.length === 11) {
    player.loadVideoById(input); // Direct video ID
  } else {
    alert("Please enter a valid YouTube URL or video ID.");
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: '',
    playerVars: {
      rel: 0,
      modestbranding: 1
    }
  });
}

async function getNotes() {
  const notesBox = document.getElementById("notesBox");
  notesBox.innerText = "⏳ Generating notes, please wait...";

  const transcript = "This is where you'd use captions or fetch from YouTube API"; // Simplified

  try {
    const response = await fetch('/generate-notes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ transcript })
    });

    const data = await response.json();
    notesBox.innerText = data.notes;
  } catch (error) {
    notesBox.innerText = "❌ Failed to generate notes. Try again.";
  }
}
