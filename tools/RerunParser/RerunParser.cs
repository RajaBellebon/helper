using System;
using ResultsParser;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Collections.Specialized;
using Common;
using System.Linq;

namespace RerunParser
{
    public class RerunParser
    {
        public static Dictionary<string, Tuple<int, string>> DictResults = new Dictionary<string, Tuple<int, string>>();

        public static int ExitCode { get; set; }

        public static NameValueCollection AppSettings = new NameValueCollection();
        public RerunParser()
        { }
                
        public static int CheckTheUpdatedDict()
        {
          return ((DictResults.Values.Any(t=>t.Item1 == 5 && t.Item2.Contains("This test has been re-run and it failed again")))?1:0);
        }

        public static void RerunTestsAndExitCode(string fileName, object project, string folderPath)
        {
            DictResults = CommonFunctions.XmlParserSelenium(fileName);
            CommonFunctions.RunFailedTestsAndCreateAResultFile(DictResults, fileName, project, folderPath);
        }

        public static int Main(string[] args)
        {
            var fileName = args[0];
            var folderPath = args[1];
            var testProject = args[2];

            // Load  AppSettings from embedded resource (saves distributing the config)
            using (var stream = typeof(RerunParser).Assembly.GetManifestResourceStream("RerunParser.appSettings.config"))
            {
                var doc = XDocument.Load(stream);
                foreach (var a in doc.Element("appSettings").Elements("add"))
                {
                    AppSettings[a.Attribute("key").Value] = a.Attribute("value").Value;
                }
            }

            RerunTestsAndExitCode(fileName, testProject, folderPath);
            ExitCode = CheckTheUpdatedDict();
            Console.WriteLine(ExitCode);

            return ExitCode;
        }
    }
}
