console.log("popup.js loaded")
document.getElementById('timeButton').addEventListener('click', () => {
  chrome.storage.local.get(['initial-time']).then((result) => {
    const initialTime = result['initial-time'];
    if (initialTime) {
      const secondsDiff = (Date.now() - initialTime) / 1000;
      console.log('Seconds elapsed: ' + secondsDiff);
      chrome.storage.local.set({ 'seconds-elapsed-last-check': secondsDiff });
      updateSecondsElapsedPopup();
    } else {
      console.log("No stored time for this tab");
    }
  });
});

const updateSecondsElapsedPopup = () => {
  const storageProp = 'seconds-elapsed-last-check';
  chrome.storage.local.get([storageProp]).then((result) => {
    const secondsElapsed = result[storageProp];
    if (secondsElapsed) {
      document.querySelector('p').innerHTML = `Seconds elapsed: ${secondsElapsed.toFixed(2)}`;
    } else {
      console.log("No stored time elapsed for this tab");
    }
  });
}
