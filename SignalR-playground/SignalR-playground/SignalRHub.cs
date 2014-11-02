using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalR_playground
{
    public class SignalRHub : Hub
    {
        public void Hello(string name)
        {
            Clients.All.hello("Hello says " + name);
        }
    }
}