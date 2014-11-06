using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;

namespace SignalR_playground
{
    public class SignalRHub : Hub
    {
        public static ConcurrentQueue<string> queue = new ConcurrentQueue<string>();
        public void Hello(string name)
        {
            string outputMessage = DateTime.Now.ToString() + ": ";
            if (Context.User != null && Context.User.Identity.IsAuthenticated)
            {
                var tmpName = Context.User.Identity.Name;
                outputMessage += "Hello says " + name + " (from " + tmpName + ")";
            }
            else
            {
                outputMessage += "Hello says " + name + " (from anonymous)";
            }
            queue.Enqueue(outputMessage);
            Clients.All.hello(outputMessage);
        }

        public override System.Threading.Tasks.Task OnConnected()
        {
            // Notify all of the connected user
            if (Context.User != null && Context.User.Identity.IsAuthenticated)
            {
                Clients.All.hello(Context.User.Identity.Name + " connected");
            }

            // Send history to connected client
            Clients.Caller.hello(queue.ToList());
            return base.OnConnected();
        }
    }
}