function receiveMsg(e) {
    console.log(e.data)
    return new Function(e.data)()
}

if (window.addEventListener) {
    window.addEventListener('message', receiveMsg, false);
} else {
    window.attachEvent('message', receiveMsg);
}