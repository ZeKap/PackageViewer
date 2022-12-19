// get resizer
const slider = document.querySelector("#resizer");

// values that are shared between the 3 functions below
var mouseX;
var before;
var beforeW;
var resizer;
var beforeStyle;

function mouseDownHandler(e) {
    // get vars when mouse is clicking
    mouseX = e.clientX;
    resizer = this;
    before = resizer.previousElementSibling;

    // add listeners to move the resizer and stopping resizing
    document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);

	// prevent mouse from selecting anything on the page
	document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';

    // get style of before
    beforeStyle = getComputedStyle(before);
    // get padding and borders we need to remove before calculate the new width
    let beforePaddingX = parseFloat(beforeStyle.paddingLeft) + parseFloat(beforeStyle.paddingRight);
    //let beforePaddingY = parseFloat(beforeStyle.paddingTop) + parseFloat(beforeStyle.paddingBottom);
    let beforeBorderX = parseFloat(beforeStyle.borderLeftWidth) + parseFloat(beforeStyle.borderRightWidth);
    //let beforeBorderY = parseFloat(beforeStyle.borderTopWidth) + parseFloat(beforeStyle.borderBottomWidth);

    // beforeW is now the width of the div without paddin and borders
	beforeW = before.getBoundingClientRect().width - (beforePaddingX + beforeBorderX);
}

function mouseMoveHandler(e) {
    // get distance from when the mouse started clicking
    const dx = e.clientX - mouseX;
    // calculate the new size of previous div
    const w = ((beforeW + dx - (before.style.padding * 2)) * 100) / resizer.parentNode.getBoundingClientRect().width;

    // set the new size of the previous div
    before.style.width = w + '%';
    // prevent mouse from flickering
	document.body.style.cursor = 'col-resize';
}

function mouseUpHandler(e) {
    // remove mouse cursor
    document.body.style.removeProperty('cursor');

    // remove preventing selection
	document.body.style.removeProperty('user-select');
    document.body.style.removeProperty('pointer-events');

    // remove handlers
	document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}

// add event listeners for the resizer
slider.addEventListener('mousedown', mouseDownHandler);
