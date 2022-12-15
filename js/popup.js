let begin = document.getElementById("begin");
let stop = document.getElementById("stop");
var div = document.getElementById("status");
let ts = null;

begin.addEventListener("click", async () => {
    div.classList.add("alert-info");
    div.classList.remove("alert-warning");
    div.innerHTML = 'RUNNING...';
    
    ts = document.getElementById('period').value;

    chrome.runtime.sendMessage({
        msg: "runBegin",
        ts: ts,
    });
});

stop.addEventListener("click", async () => {
    div.classList.add("alert-warning");
    div.classList.remove("alert-info");
    div.innerHTML = 'STOPPED.';
    
    chrome.runtime.sendMessage({ msg: "runStop" });
});