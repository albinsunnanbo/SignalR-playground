using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SignalR_playground.Startup))]
namespace SignalR_playground
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR(); 
            ConfigureAuth(app);
        }
    }
}
