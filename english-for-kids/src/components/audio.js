let audio;

export default function playAudio(url) {
  audio = new Audio();
  audio.src = url;
  audio.load();
  audio.play();
}
