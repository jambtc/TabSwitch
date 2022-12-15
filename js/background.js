let intervalID = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log("background.js got a message")
    // console.log(request);
    // console.log(sender);
    // console.log(sendResponse);

    if (request.msg == "runBegin") {
        runStop();
        runStart(request.ts);
    }

    if (request.msg == "runStop") {
        runStop();
    }
});


function runStart(ts) {
    intervalID = setInterval(function () {
        openNewTab()
    }, ts * 1000);
}

function runStop() {
    clearInterval(intervalID);
}

function openNewTab() {
    chrome.tabs.query({ active: true }, function (tabs) {
        var tabIndex = tabs[0].index
        chrome.tabs.query({}, function (tabs) {
            var tabsNumber = tabs.length
            var tabToOpen = tabIndex + 1
            if (tabToOpen >= tabsNumber) {
                tabToOpen = 0
            }
            var tabToRefresh = tabToOpen + 1
            if ((tabToOpen + 1) === tabsNumber) {
                tabToRefresh = 0
            }
            chrome.tabs.update(tabs[tabToOpen].id, { active: true })
            chrome.tabs.reload(tabs[tabToRefresh].id)
        })
    });
}



