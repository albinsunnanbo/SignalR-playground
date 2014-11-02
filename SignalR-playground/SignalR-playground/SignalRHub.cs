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
            if (Context.User != null && Context.User.Identity.IsAuthenticated)
            {
                var tmpName = Context.User.Identity.Name;
                Clients.All.hello("Hello says " + name + " (from " + tmpName + ")");
            }
            else
            {
                Clients.All.hello("Hello says " + name + " (from anonymous)");
            }
        }

        //public override System.Threading.Tasks.Task OnConnected()
        //{
        //    if (Context.User != null && Context.User.Identity.IsAuthenticated)
        //    {
        //        var tmpName = Context.User.Identity.Name;
        //    }
        //    return base.OnConnected();
        //}
    }
}