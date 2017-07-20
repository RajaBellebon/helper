using System.Configuration;

namespace DomainDigitalData.Infrastructure
{
    public static class ConfigurationHelper
    {
        public static string WebServer => ConfigurationManager.AppSettings["WebServer"];

        public static string EmailLink => ConfigurationManager.AppSettings["emailLink"];

        public static string BuildVersion => ConfigurationManager.AppSettings["BuildVersion"];

        public static string Browser => ConfigurationManager.AppSettings["Browser"];

        public static string BrowserVersion => ConfigurationManager.AppSettings["BrowserVersion"];

        public static string OS => ConfigurationManager.AppSettings["OS"];

        public static string OSVersion => ConfigurationManager.AppSettings["OSVersion"];

        public static string BrowserstackUser => ConfigurationManager.AppSettings["BrowserstackUser"];

        public static string BrowserstackKey => ConfigurationManager.AppSettings["BrowserstackKey"];

        public static string BrowserstackDebug => ConfigurationManager.AppSettings["BrowserstackDebug"];

        public static string BrowserstackWait => ConfigurationManager.AppSettings["BrowserstackWait"];
        public static string BrowserstackLocal => ConfigurationManager.AppSettings["BrowserstackLocal"];
        public static bool UseBrowserStack => bool.Parse(ConfigurationManager.AppSettings["UseBrowserStack"]);

        public static bool UseSeleniumGrid => bool.Parse(ConfigurationManager.AppSettings["UseSeleniumGrid"]);

        public static string ScreenshotsDirectory => ConfigurationManager.AppSettings["ScreenshotsDirectory"];

        public static bool ReportFalseNegatives => bool.Parse(ConfigurationManager.AppSettings["ReportFalseNegatives"]);

        public static string ProjectName => ConfigurationManager.AppSettings["ProjectName"];

        public static int MaxAttempts => int.Parse(ConfigurationManager.AppSettings["MaxAttempts"]);
    }
}
