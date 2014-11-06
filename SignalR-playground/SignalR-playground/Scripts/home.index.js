$(function () {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.signalRHub;
    // Create a function that the hub can call back to display messages.
    chat.client.hello = function (messages) {
        // if just a single string, wrap in an array
        if (typeof messages === 'string') {
            messages = [messages];
        }
        // Add the messages to the page.
        $.each(messages, function (idx, message) {
            $('#output').append('<p>' + htmlEncode(message) + '</p>');
        });
    };
    // Get the user name and store it to prepend to messages.
    // Start the connection.
    $.connection.hub.start().done(function () {
        // Call the Send method on the hub.
        chat.server.hello("connect");

        $("#hello-button").click(function (event) {
            chat.server.hello($('#user-name').val());
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}