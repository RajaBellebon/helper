using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Windows.Forms;
using System.Xml.Linq;
using Gurock.TestRail;
using System.Linq;
using System.Collections.Specialized;
using Common;

namespace ResultsParser
{

    public class AddResultsRequest
    {
        public AddResultsRequest()
        {
            results = new List<AddResultsItem>();
        }

        public List<AddResultsItem> results { get; set; }

        public class AddResultsItem
        {
            public string test_id { get; set; }
            public int status_id { get; set; }
            public string comment { get; set; }
            public string defects { get; set; }
        }
    }

    public static class RunandResults
    {
        public static JArray RArray { get; private set; }
        public static JObject Tr { get; set; }
        public static int SuiteId;
        public static string RunName;
        public static string TestName;

        public static NameValueCollection AppSettings = new NameValueCollection();

        //RB: This function allows to add cases for a dedicated project, suite, section
        public static void AddCases(Dictionary<string, Tuple<int, string>> dict, string path, string testType, object project, object suiteName, object sectionName, string sectionId)
        {
            var dictNameSuite = GetSuites(project);
            var dictNameSections = GetSections(project, dictNameSuite, suiteName.ToString());
            List<string> TestRailLists = new List<string>();

            RArray = TestExporter.Get1("get_cases/" +
                                        AppSettings[project.ToString()] + "&suite_id=" +
                                       dictNameSuite[suiteName.ToString()] + "&section_id=" +
                                       dictNameSections[sectionName.ToString()]);
            if (RArray.Count == 0)
            {
                foreach (string key in dict.Keys)
                {
                    JObject r = TestExporter.CreateTestName("add_case/" + sectionId, key);
                    JToken s = r.First;
                    string[] t = (s.ToString()).Split(':');
                }
            }
            else
            {
                if (RArray.Count() != dict.Count())
                {
                    //In this step, add any tests not present in TestRail in case of 429 exception, you can keep adding tests
                    foreach (var item in RArray.Children())
                    {
                        var obj = JObject.Parse(item.ToString());
                        var title = (string)obj.SelectToken("title");
                        TestRailLists.Add(title.Trim());
                    }
                    foreach (var elem in dict.Keys.ToList())
                    {
                        if (!TestRailLists.Contains(elem.Trim()))
                        {
                            JObject r = TestExporter.CreateTestName("add_case/" + sectionId, elem);
                        }
                    }
                }
                else { Console.WriteLine("Test Cases have been already added"); }
            }                  
        }

        //RB: This function gets the suites name and ID for a specific project
        public static Dictionary<string, string> GetSuites(object project)
        {
            // Load  AppSettings from embedded resource (saves distributing the config)
            using (var stream = typeof(RunandResults).Assembly.GetManifestResourceStream("ResultsParser.appSettings.config"))
            {
                var doc = XDocument.Load(stream);
                foreach (var a in doc.Element("appSettings").Elements("add"))
                {
                    AppSettings[a.Attribute("key").Value] = a.Attribute("value").Value;
                }
            }
            RArray = TestExporter.Get1("get_suites/" +  AppSettings[project.ToString()]);
            Dictionary<string, string> dictNameSuite = new Dictionary<string, string>();
            foreach (var item in RArray.Children())
            {
                var obj = JObject.Parse(item.ToString());
                dictNameSuite.Add((string)obj.SelectToken("name"), (string)obj.SelectToken("id"));
            }
            return dictNameSuite;
        }

        //RB: This function gets the sections name and ID for a specific suite
        public static Dictionary<string, string> GetSections(object project, Dictionary<string, string> dictNameSuite, string suiteName)
        {

            RArray = TestExporter.Get1("get_sections/" +  AppSettings[project.ToString()] + "&suite_id=" + dictNameSuite[suiteName]);
            Dictionary<string, string> dictNameSections = new Dictionary<string, string>();
            foreach (var item in RArray.Children())
            {
                var obj = JObject.Parse(item.ToString());
                dictNameSections.Add((string)obj.SelectToken("name"), (string)obj.SelectToken("id"));
            }
            return dictNameSections;
        }

        //RB: This function gets the test cases and add it to the specific run
        public static JObject GetCasesandAddtoRun(Dictionary<string, Tuple<int, string>> dict, Dictionary<string, string> dictNameSuite, Dictionary<string, string> dictNameSections, string testTypes, object project, object suiteName, object sectionName)
        {
            RArray = TestExporter.Get1("get_cases/" +
                                        AppSettings[project.ToString()] + "&suite_id=" +
                                       dictNameSuite[suiteName.ToString()] + "&section_id=" +
                                       dictNameSections[sectionName.ToString()]);
            SuiteId = int.Parse(dictNameSuite[suiteName.ToString()]);
            RunName = suiteName + " " + System.DateTime.Now;
            Tr = TestExporter.CreateTestRunAddAllCases("add_run/" +  AppSettings[project.ToString()], SuiteId, RunName);
            return Tr;
        }
      
        //RB: This function below compares the current running tests with the tests currently present in TestRail:
        // - if the test is not present in TestRail, it will add it,
        // - if the test is not present in the file, it will delete it from TestRail,
        // - finally, it will return the correct list of tests cases
        public static void CompareAndUpdate(Dictionary<string, Tuple<int, string>> testsFromFile, string path, string testType, object project, Dictionary<string, string> dictNameSuite, Dictionary<string, string> dictNameSections, object suiteName, object sectionName)
        {
            List<Tuple<string, string>> testRailTestsList = new List<Tuple<string, string>>();
            List<Tuple<string, string>> TestcasesWithDuplicates = new List<Tuple<string, string>>();
            List<string> fileTestsList = new List<string>();
            Dictionary<string, string> difference = new Dictionary<string, string>();

            var testsFromTestRails = TestExporter.Get1("get_cases/" +
                                        AppSettings[project.ToString()] + "&suite_id=" +
                                       dictNameSuite[suiteName.ToString()] + "&section_id=" +
                                       dictNameSections[sectionName.ToString()]);

            fileTestsList = testsFromFile.Keys.ToList();

            //First step, clean the tests that are not in the file
            foreach (var item in testsFromTestRails.Children())
            {
                var obj = JObject.Parse(item.ToString());
                var title = (string)obj.SelectToken("title");
                string caseId = (string)obj.SelectToken("id");
                testRailTestsList.Add(Tuple.Create(title, caseId));
                if (!fileTestsList.Contains(title))
                {
                    JObject r = TestExporter.DeleteTestCase("delete_case/" + caseId, caseId);
                }
            }

            //Second step, clean any duplicates in the TestRail section
            TestcasesWithDuplicates = testRailTestsList.GroupBy(s => s.Item1)
                .SelectMany(grp => grp.Skip(1))
                .ToList();
            if (TestcasesWithDuplicates.Count() > 0)
            {
                foreach (var dupli in TestcasesWithDuplicates)
                {
                    JObject r = TestExporter.DeleteTestCase("delete_case/" + dupli.Item2, dupli.Item2);
                }

            }
            testRailTestsList = testRailTestsList.Distinct().ToList();
            //RB: This line is currently added as the API tests will only show the failed one
            if (testType != "API")
            {
                //Third step, add any tests not present in TestRail
                foreach (var elem in fileTestsList)
                {
                    bool tupleHadProduct = testRailTestsList.Any(m => m.Item1 == elem);
                    if (!tupleHadProduct)
                    {
                        string sectionId = dictNameSections[sectionName.ToString()];
                        JObject r = TestExporter.CreateTestName("add_case/" + sectionId, elem);
                    }
                }
            }
            else
            {
                foreach (var elem in testsFromFile)
                {
                    bool tupleHadProduct = testRailTestsList.Any(m => m.Item1 == elem.Key);
                    if (elem.Value.Item1 == 5 && !tupleHadProduct)
                    {
                        var testCase = (elem.Key.Length > 250) ? elem.Key.Remove(240) : elem.Key;
                        string sectionId = dictNameSections[sectionName.ToString()];
                        JObject r = TestExporter.CreateTestName("add_case/" + sectionId, testCase);
                    }
                }
            }
        }

        //RB: This function is a workaround to delete several tests in a row
        public static void DeleteTestsWorkAround(Dictionary<string, Tuple<int, string>> testsFromFile, string path, object project, Dictionary<string, string> dictNameSuite, Dictionary<string, string> dictNameSections, object suiteName, object sectionName)
        {
            var getCases = TestExporter.Get1("get_cases/" +
                                       AppSettings[project.ToString()] + "&suite_id=" +
                                      dictNameSuite[suiteName.ToString()] + "&section_id=" +
                                      dictNameSections[sectionName.ToString()]);

            List<string> ListCasesToDelete = new List<string>();
            if (getCases.Count != 0)
            {
                // List the tests that are not in the file
                foreach (var item in getCases.Children())
                {
                    var obj = JObject.Parse(item.ToString());
                    var title = (string)obj.SelectToken("title");
                    if (!testsFromFile.Keys.Contains(title))
                    {
                        ListCasesToDelete.Add(title);
                    }
                }
                // Create a section
                TestExporter.CreateSection("add_section/" +  AppSettings[project.ToString()], "TestsToBeDeleted");

                // Get the section and section Id
                dictNameSections = GetSections(project, dictNameSuite, suiteName.ToString());
                string sectionId = dictNameSections["TestsToBeDeleted"];

                // Add the unnecessary tests to the section
                foreach (var elem in ListCasesToDelete)
                {
                    JObject r = TestExporter.CreateTestName("add_case/" + sectionId, elem);
                }

                // Delete the section
                TestExporter.Post("delete_section/" + sectionId);
            }
        }

        //RB: This function below gets the tests run id
        public static JArray GetTestsRunId(JObject tr)
        {
            var st = tr.First;
            string[] id = (st.ToString()).Split(':');
            JArray getRun = TestExporter.Get1("get_tests/" + id[1].TrimStart());
            return getRun;
        }

        //RB: This function below bulk fill the results and add comments
        public static void FillTheResultsBulkAndCloseTheRun(JObject tr, JArray getRun, Dictionary<string, Tuple<int, string>> dict)
        {
            var st = tr.First;
            string[] ids = (st.ToString()).Split(':');
            var runId = ids[1].TrimStart(); // RunID
            var request = new AddResultsRequest();

            foreach (var item in getRun.Children())
            {
                var obj = JObject.Parse(item.ToString());
                var title = (string)obj.SelectToken("title");
                var id = (string)obj.SelectToken("id");
                int res = (int)obj.SelectToken("status_id");
                var comment = (string)obj.SelectToken("comment");
                if (dict.ContainsKey(title))
                {
                    var tupleStatusComment = dict[title];
                    res = tupleStatusComment.Item1;
                    comment = tupleStatusComment.Item2;
                    AddResultsRequest.AddResultsItem addItem = new AddResultsRequest.AddResultsItem();
                    addItem.test_id = id;
                    addItem.status_id = res;
                    addItem.comment = comment;
                    request.results.Add(addItem);
                }
            }
            TestExporter.AddTestResults("add_results/" + runId, request);
            TestExporter.Post("close_run/" + runId);
        }

        //RB: This function below fill the result one by one and add comments but it is consuming too much of API
        public static void FillTheResult(JArray getRun, Dictionary<string, Tuple<int, string>> dict)
        {

            foreach (var item in getRun.Children())
            {
                // This is a way to grab title (test name) and the id
                var obj = JObject.Parse(item.ToString());
                var title = (string)obj.SelectToken("title");
                var id = (string)obj.SelectToken("id");
                if (dict.ContainsKey(title))
                {
                    var tupleStatusComment = dict[title];
                    TestExporter.Result("add_result/" + id, tupleStatusComment.Item1, tupleStatusComment.Item2);
                }
            }
        }
        static void Main(string[] args)
        {
            var fileName = args[0];
            var testType = args[1];
            var folderPath = args[2];
            var testProject = args[3];
            var testSuite = args[4];
            var testSection = args[5];

            // Load  AppSettings from embedded resource (saves distributing the config)
            using (var stream = typeof(RunandResults).Assembly.GetManifestResourceStream("ResultsParser.appSettings.config"))
            {
                var doc = XDocument.Load(stream);
                foreach (var a in doc.Element("appSettings").Elements("add"))
                {
                    AppSettings[a.Attribute("key").Value] = a.Attribute("value").Value;
                }
            }

            Dictionary<string, Tuple<int, string>> dictMain = new Dictionary<string, Tuple<int, string>>();
            JObject tr;
            JArray getRun;
            var dictNameSuite = GetSuites(testProject);
            var dictNameSections = GetSections(testProject, dictNameSuite, testSuite);
            switch (testType)
            {
                case "Selenium":
                    dictMain = CommonFunctions.XmlParserSelenium(fileName);
                    CommonFunctions.RunFailedTestsAndCreateAResultFile(dictMain, fileName, testProject, folderPath);
                    XMLUpdate.XmlUpdate(dictMain, fileName);
                    break;

                case "Load":
                    dictMain = CommonFunctions.XmlParserLoad(fileName);
                    break;

                case "API":
                    dictMain = CommonFunctions.XmlParserApi(fileName);
                    break;

                default:
                    Console.WriteLine("Error - Not a valid Test type");
                    break;
            }

            CompareAndUpdate(dictMain, fileName, testType, testProject, dictNameSuite, dictNameSections, testSuite, testSection);
            tr = GetCasesandAddtoRun(dictMain, dictNameSuite, dictNameSections, testType, testProject, testSuite, testSection);
            getRun = GetTestsRunId(tr);
            FillTheResultsBulkAndCloseTheRun(tr, getRun, dictMain);
            Console.WriteLine("Test Results have been successfully exported and the run has been closed and archived");
        }
    }
}