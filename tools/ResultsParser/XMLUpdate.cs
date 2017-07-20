using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;

namespace ResultsParser
{
    public class XMLUpdate
    {
        public static void XmlUpdate(Dictionary<string, Tuple<int, string>> _dict, string pathFileName)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathFileName);
            XmlNodeList tests = doc.DocumentElement.SelectNodes("/assemblies/assembly/collection/test");
            XmlNode summary = doc.DocumentElement.SelectSingleNode("/assemblies/assembly");
            for (int i = 0; i < tests.Count; i++)
            {
                string testName = tests[i].Attributes["name"]?.InnerText;
                string res = tests[i].Attributes["result"]?.InnerText;
                if (_dict.Keys.Contains(testName) && res == "Fail" && _dict[testName].Item2.Contains("This test has been re-run and it passed"))
                {
                    // RB: Update the test result to "Pass", update the collection and the summary
                    tests[i].Attributes["result"].Value = "Pass";
                    var numberOfFailed = int.Parse(tests[i].ParentNode.Attributes["failed"].Value);
                    var numberOfPassed = int.Parse(tests[i].ParentNode.Attributes["passed"].Value);
                    var numberOfFailedTot = int.Parse(summary.Attributes["failed"].Value);
                    var numberOfPassedTot = int.Parse(summary.Attributes["passed"].Value);
                    tests[i].ParentNode.Attributes["failed"].Value = (numberOfFailed - 1).ToString();
                    tests[i].ParentNode.Attributes["passed"].Value = (numberOfPassed + 1).ToString();
                    summary.Attributes["failed"].Value = (numberOfFailedTot - 1).ToString();
                    summary.Attributes["passed"].Value = (numberOfPassedTot + 1).ToString();
                    // RB: Remove the failure nodes + message
                    if (tests[i].ChildNodes.Count > 2)
                    {
                        tests[i].RemoveChild(tests[i].ChildNodes[2]);
                    }
                    else
                    {
                        tests[i].RemoveChild(tests[i].ChildNodes[1]);
                    }                       
                    // RB: Remove any character / text after the indication of session
                    var outputText = tests[i].ChildNodes[0].InnerXml.Split(("\r\n").ToCharArray());
                    for (int j = 1; j < outputText.Length; j++)
                    {
                        tests[i].ChildNodes[0].InnerText = outputText[0] + "\r\n" + outputText[j] + "]]>";
                    }
                }             
            }
            doc.Save(pathFileName);
        }
    }
}
