(function () {
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

        continousReconnect();
        setupNotifications();
    });

    // This optional function html-encodes messages for display in the page.
    var htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    }

    // Setup infinite reconnect
    var continousReconnect = function () {
        $.connection.hub.disconnected(function () {
            setTimeout(function () {
                $.connection.hub.start();
            }, 5000); // Restart connection after 5 seconds.
        });
    };

    var setupNotifications = function () {
        $.connection.hub.connectionSlow(function () {
            $("#notification-area").text("Connection is slow");
        });

        $.connection.hub.reconnecting(function () {
            $("#notification-area").text("Reconnecting...");
        });

        $.connection.hub.reconnected(function () {
            var notificationText = "Connected!";
            $("#notification-area").text(notificationText);
            // Dirty hack to clear, just check that we still have the same text
            setTimeout(function () {
                if ($("#notification-area").text() === notificationText); {
                    $("#notification-area").text(''); // Clear
                }
            }, 5000);
        });
    };
})();