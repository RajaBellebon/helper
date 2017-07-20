using System;
using System.Diagnostics;
using System.Xml;
using Domain.Search.Urls.Parameters;
using DomainSEO.Infrastructure;
using DomainSEO.Infrastructure.xUnit.Framework;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Xunit;


namespace DomainSEO.Tests.Regression.ConsumerSite.PageSourceTests
{
    public class SearchResults : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.DomainWebServer.Split(';')[0]);

        private static string Url { get; set; }

        private static int CountSearchService { get; set; }
        private static List<int> CountSearchServiceList { get; set; }

        public void ExecuteCmdNew()
        {         
            // Start a new process to rerun failed tests
            Process runCmd = new Process();
            {
                var command =
                "newman run C:\\API_Tests\\domain-integrationtests\\search-service\\SearchCount.postman_collection.json" +
                " --environment C:\\API_Tests\\domain-integrationtests\\search-service\\environments\\SearchService-Prod-New.postman_environment.json" +
                " --reporters junit --reporter-junit-export C:\\seo-data-analytics-testing\\DomainSEO\\CountNew.xml -x";
   
                runCmd.StartInfo = new ProcessStartInfo("cmd.exe", "/c " + command);
                runCmd.Start();
                runCmd.WaitForExit();                                   
            }
        }
        public void ExecuteCmdOld()
        {
            // Start a new process to rerun failed tests
            Process runCmd = new Process();
            {
                var command =
                "newman run C:\\API_Tests\\domain-integrationtests\\search-service\\SearchCount.postman_collection.json" +
                " --environment C:\\API_Tests\\domain-integrationtests\\search-service\\environments\\SearchService-Prod.postman_environment.json" +
                " --reporters junit --reporter-junit-export C:\\seo-data-analytics-testing\\DomainSEO\\CountOld.xml -x";

                runCmd.StartInfo = new ProcessStartInfo("cmd.exe", "/c " + command);
                runCmd.Start();
                runCmd.WaitForExit();
            }
        }
        public void ReadAndGet()
        {
            // path for xml = C:\seo - data - analytics - testing\DomainSEO
            XmlDocument Doc = new XmlDocument();
            Doc.Load("C:\\seo-data-analytics-testing\\DomainSEO\\Count.xml");
            XmlNodeList testCases = Doc.DocumentElement.SelectNodes("/testsuites/testsuite/testcase");
            for (int i = 0; i < testCases.Count; i++)
            {
                var partialTestName = testCases[i].Attributes["name"]?.InnerText;
                if (partialTestName.ToString().Contains("Results"))
                {
                    var count = Regex.Split(partialTestName, @"[^0-9\.]+");
                    CountSearchService=Convert.ToInt32(count[0]);
                }
            }
        }
        public void ReadAndGetListNew()
        {
            // path for xml = C:\seo - data - analytics - testing\DomainSEO
            XmlDocument Doc = new XmlDocument();
            Doc.Load("C:\\seo-data-analytics-testing\\DomainSEO\\CountNew.xml");
            XmlNodeList testCases = Doc.DocumentElement.SelectNodes("/testsuites/testsuite/testcase");
            List<int> list1 = new List<int>();
            for (int i = 0; i < testCases.Count; i++)
            {
                var partialTestName = testCases[i].Attributes["name"]?.InnerText;
                if (partialTestName.ToString().Contains("Results"))
                {
                    var count = Regex.Split(partialTestName, @"[^0-9\.]+");
                    list1.Add(Convert.ToInt32(count[0]));
                }            
            }
            CountSearchServiceList = list1;
        }
        public void ReadAndGetListOld()
        {
            // path for xml = C:\seo - data - analytics - testing\DomainSEO
            XmlDocument Doc = new XmlDocument();
            Doc.Load("C:\\seo-data-analytics-testing\\DomainSEO\\CountOld.xml");
            XmlNodeList testCases = Doc.DocumentElement.SelectNodes("/testsuites/testsuite/testcase");
            List<int> list1 = new List<int>();
            for (int i = 0; i < testCases.Count; i++)
            {
                var partialTestName = testCases[i].Attributes["name"]?.InnerText;
                if (partialTestName.ToString().Contains("Results"))
                {
                    var count = Regex.Split(partialTestName, @"[^0-9\.]+");
                    list1.Add(Convert.ToInt32(count[0]));
                }
            }
            CountSearchServiceList = list1;
        }

        //[UITheory]
        //[InlineData(ListingType.Sale)]
        //public void ViewPageSourceCountExecuteNew(ListingType mode)
        //{
        //    Url =
        //       BuildUrl()
        //           .SetLocation(state: State.NSW, suburb: "Pyrmont", area: "Sydney City", postcode: "2009" )
        //           .SetParameters(mode)
        //           .Perform(_baseUri); // + query;

        //    ExecuteCmdNew();

        //    ReadAndGet();

        //    ParsePage(Url)
        //        .GetCountResults(CountSearchService);
        //}

        //[UITheory]
        //[InlineData(ListingType.Sale)]
        //[InlineData(ListingType.Rent)]
        //[InlineData(ListingType.Share)]
        //[InlineData(ListingType.Sold)]

        public void ViewPageSourceCountNew(ListingType mode)
        {
            Url =
               BuildUrl()
                   .SetLocation(state: State.NSW, suburb: "Pyrmont", area: "Sydney City", postcode: "2009")
                   .SetParameters(mode)
                   .Perform(_baseUri); // + query;

            ExecuteCmdNew();

            ReadAndGetListNew();

            switch (mode)
            {
                case ListingType.Sale:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[0]);
                    break;
                case ListingType.Rent:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[1]);
                    break;
                case ListingType.Share:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[2]);
                    break;
                case ListingType.Sold:
                    ParsePage(Url)
                       .GetCountResults(CountSearchServiceList[3]);
                    break;
            }
        }

        //[UITheory]
        //[InlineData(ListingType.Sale)]
        //[InlineData(ListingType.Rent)]
        //[InlineData(ListingType.Share)]
        //[InlineData(ListingType.Sold)]

        public void ViewPageSourceCountOld(ListingType mode)
        {
            Url =
               BuildUrl()
                   .SetLocation(state: State.NSW, suburb: "Pyrmont", area: "Sydney City", postcode: "2009")
                   .SetParameters(mode)
                   .Perform(_baseUri); // + query;

            ExecuteCmdOld();

            ReadAndGetListOld();

            switch (mode)
            {
                case ListingType.Sale:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[0]);
                    break;
                case ListingType.Rent:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[1]);
                    break;
                case ListingType.Share:
                    ParsePage(Url)
                        .GetCountResults(CountSearchServiceList[2]);
                    break;
                case ListingType.Sold:
                    ParsePage(Url)
                       .GetCountResults(CountSearchServiceList[3]);
                    break;
            }
        }
    }
}
