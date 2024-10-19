let resultField = document.getElementById('result');
let historyList = document.getElementById('history-list');

// Append value to the result input
function appendValue(value) {
    resultField.value += value;
}

// Clear the result input
function clearResult() {
    resultField.value = '';
}

// Delete the last character from the result input
function deleteLast() {
    resultField.value = resultField.value.slice(0, -1);
}

// Perform calculation and store result
function calculate() {
    try {
        let result = eval(resultField.value);
        resultField.value = result;
        addToHistory(resultField.value);
    } catch (error) {
        resultField.value = 'Error';
    }
}

// Add result to history
function addToHistory(calculation) {
    let historyItem = document.createElement('li');
    historyItem.textContent = calculation;
    historyList.appendChild(historyItem);

    // Store history in localStorage
    saveHistory();
}

// Save the history in localStorage
function saveHistory() {
    let history = [];
    document.querySelectorAll('#history-list li').forEach(item => {
        history.push(item.textContent);
    });
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Load the history from localStorage on page load
window.onload = function() {
    let savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
        let historyArray = JSON.parse(savedHistory);
        historyArray.forEach(item => {
            let historyItem = document.createElement('li');
            historyItem.textContent = item;
            historyList.appendChild(historyItem);
        });
    }
};
