using DomainDigitalData.Infrastructure;
using DomainDigitalData.Tests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace DomainDigitalData.Tests.PageSourceTests
{

    public class ProjectDigitalDataParameterNotPresent : IEnumerable<object[]>
    {
        private static List<string> ListProjectDigitalDataParamNotPresent = new List<string>
        {
               "\"agent name\":","\"articleTemplate\":","\"isEmbeddedApp\":",  "\"agencyIds1\":", "\"agencyIds2\":", "\"agencyName\":",
               "\"bathroomsFrom\":","\"bathroomsTo\":","\"bedroomsFrom\":","\"bedroomsTo\":","\"carSpaces\":","\"geoType\":","\"keywords\":","\"landsizeFrom\":",
               "\"landsizeTo\":","\"mapSearch\":","\"priceFrom\":","\"priceTo\":","\"propertyFeatures\":","\"propertyTypeIds\":","\"propertyTypeIds1\":",
               "\"resultsPages\":","\"resultsRecords\":","\"resultsRecords1\":","\"resultsRecords2\":","\"topspotAgency\":","\"sessionToken\"",
               "\"isDreamHomes\":","\"isFeaturedProperty\":","\"estimateAvailable\":","\"rentalsAvailable\":","\"salesAvailable\":","\"dateOfPurchase\":",
               "\"subCategory2\":","\"subCategory3\":","\"subCategory4\":","\"articleTags\":","\"agency\":", "\"topspotResults\":","\"resultsPosition\":",
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListProjectDigitalDataParamNotPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }

    public class ProjectDigitalDataParameterPresent : IEnumerable<object[]>
    {
        private static List<string> ListProjectDigitalDataParamPresent = new List<string>
        {
            "\"author\": \"26376\"","\"address\": \"Beadell WA 6440\"","\"adType\": \"Project\"",
            "\"photoCount\":","\"postcode\":","\"state\": \"WA\"","\"suburb\": \"Beadell",
            "\"videoCount\": \"0\"","\"brand\": \"domain\"","\"generator\": \"DO\"", "\"pageId\": \"1263\"","\"pageName\": \"project details - sale - 1263 - new homes\"", "\"sysEnv\": \"desktop\"",
            "\"primaryCategory\": \"New Homes\"","\"subCategory1\": \"Project Details\"","\"pageType\": \"Listing\"","\"profileId\": \"\"","\"membershipType\": \"visitor\"","\"membershipState\": \"Not_logged_in\"", 
            "\"emailHash\": \"\"","\"ipAddress\": ","\"version\": \"1.0\"","\"events\": []", "\"propertyFeatures\":",
            "\"listingPageType\": \"ProjectListing\"","\"projectType\": \"Premium\"","\"effectiveDate\":", "\"floorPlansCount\":",
            "\"issueDate\":","\"suburbId\": \"19148\"" ,"\"primaryPropertyType\": \"New Developments\"","\"secondaryPropertyType\": \"New House & Land\"",
        };


        private List<object[]> ListTestData
        {
            get
            {
                return ListProjectDigitalDataParamPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class PageSourceProjectTests : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.WebServer);
        private static string Url { get; set; }

        public PageSourceProjectTests()
        {
        }

        [Theory]
        [ClassData(typeof(ProjectDigitalDataParameterNotPresent))]
        public void PageSource_Digital_Data_Project_Parameter_Not_Present(string param)
        {
            Url = _baseUri.ToString() + "/project/1263";

            ParsePage(Url)
                .ShouldNotContainDigitalDataParam(param);
        }
        [Theory]
        [ClassData(typeof(ProjectDigitalDataParameterPresent))]
        public void PageSource_Digital_Data_Project_Parameter_Present(string param)
        {
            Url = _baseUri.ToString() + "/project/1263";

            ParsePage(Url)
                .ShouldContainDigitalDataParam(param);
        }
    }
}