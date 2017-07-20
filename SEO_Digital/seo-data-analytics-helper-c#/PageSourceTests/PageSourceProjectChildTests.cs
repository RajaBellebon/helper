using DomainDigitalData.Infrastructure;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace DomainDigitalData.Tests.PageSourceTests
{
    public class ProjectChildDigitalDataParameterNotPresent : IEnumerable<object[]>
    {
        private static List<string> ListProjectChildDigitalDataParamNotPresent = new List<string>
        {
               "\"agent name\":","\"articleTemplate\":","\"isEmbeddedApp\":",  "\"agencyIds1\":", "\"agencyIds2\":", "\"agencyTopspot\":", "\"agencyName\":",
               "\"bathroomsFrom\":","\"bathroomsTo\":","\"bedroomsFrom\":","\"bedroomsTo\":","\"carSpaces\":","\"geoType\":","\"keywords\":","\"landsizeFrom\":",
               "\"landsizeTo\":","\"mapSearch\":","\"priceFrom\":","\"priceTo\":","\"propertyFeatures\":","\"propertyTypeIds\":","\"propertyTypeIds1\":",
               "\"resultsPages\":","\"resultsRecords\":","\"resultsRecords1\":","\"resultsRecords2\":","\"isDreamHomes\":","\"isFeaturedProperty\":",
               "\"estimateAvailable\":","\"rentalsAvailable\":","\"salesAvailable\":","\"dateOfPurchase\":","\"sessionToken\"",
               "\"subCategory2\":","\"subCategory3\":","\"subCategory4\":","\"articleTags\":", 
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListProjectChildDigitalDataParamNotPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }
        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }

    public class ProjectChildDigitalDataParameterPresent : IEnumerable<object[]>
    {
        private static List<string> ListProjectChildDigitalDataParamPresent = new List<string>
        {
            "\"author\": \"26376\"","\"address\": \"Beadell WA 6440\"","\"adType\": \"Project listing\"","\"bedrooms\":","\"bathrooms\":","\"landsize\":","\"buildingsize\":","\"parking\":",
            "\"photoCount\":","\"postcode\":","\"price\":","\"state\": \"WA\"","\"suburb\": \"Beadell","\"floorPlansCount\":","\"videoCount\": \"0\"","\"agentNames\":", "\"agencyId\":",
            "\"brand\": \"domain\"","\"generator\": \"DO\"", "\"pageId\": \"2012523139\"","\"pageName\": \"project details - listing - new homes - 2012523139 - beadell wa 6440\"", "\"sysEnv\": \"desktop\"",
            "\"primaryCategory\": \"New Homes\"","\"subCategory1\": \"Project Details - Listing\"","\"pageType\": \"Listing\"","\"profileId\": \"\"","\"membershipType\": \"visitor\"","\"membershipState\": \"Not_logged_in\"", 
            "\"emailHash\": \"\"","\"ipAddress\": ","\"version\": \"1.0\"","\"events\": []","\"propertyFeatures\":","\"listingPageType\": \"ProjectChildListing\"", "\"projectType\": \"Premium\"",
            "\"agency\":","\"effectiveDate\":", "\"issueDate\":","\"suburbId\": \"19148\"" ,"\"primaryPropertyType\": \"New Developments\"","\"secondaryPropertyType\": \"New House & Land\"",
        };


        private List<object[]> ListTestData
        {
            get
            {
                return ListProjectChildDigitalDataParamPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class PageSourceProjectChildTests : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.WebServer);
        private static string Url { get; set; }

        public PageSourceProjectChildTests()
        {
        }

        [Theory]
        [ClassData(typeof(ProjectChildDigitalDataParameterNotPresent))]
        public void PageSource_Digital_Data_Project_Child_Parameter_Not_Present(string param)
        {
            Url = _baseUri.ToString() + "/2012523139";

            ParsePage(Url)
                .ShouldNotContainDigitalDataParam(param);
        }
        [Theory]
        [ClassData(typeof(ProjectChildDigitalDataParameterPresent))]
        public void PageSource_Digital_Data_Project_Child_Parameter_Present(string param)
        {
            Url = _baseUri.ToString() + "/2012523139";

            ParsePage(Url)
                .ShouldContainDigitalDataParam(param);
        }
    }
}