function receiveMsg(e) {
    return new Function(e.data)()
}

if (window.addEventListener) {
    window.addEventListener('message', receiveMsg, false);
} else {
    window.attachEvent('message', receiveMsg);
}