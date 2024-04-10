console.log("content.js loaded")

const componentHTML = `
  <div id="end-time-count-action">
    <p>Seconds elapsed: N/A</p>
    <button id="timeButton2">Finish reading</button>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', componentHTML);
console.log(componentHTML)

document.getElementById('timeButton2').addEventListener('click', () => {
  console.log("Button on content.js clicked")
  chrome.storage.local.get(['initial-time']).then((result) => {
    const initialTime = result['initial-time'];
    if (initialTime) {
      const secondsElapsed = (Date.now() - initialTime) / 1000;
      document.querySelector('#end-time-count-action p').innerHTML = `Seconds elapsed: ${secondsElapsed.toFixed(2)}`;
      document.querySelector('#end-time-count-action button').disabled = true;
    } else {
      console.log("No stored time for this tab");
    }
  });
});
