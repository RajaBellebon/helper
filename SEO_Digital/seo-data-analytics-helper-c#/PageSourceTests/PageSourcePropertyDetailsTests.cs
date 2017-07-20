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
    public class PropertyDetailsDigitalDataParameterNotPresent : IEnumerable<object[]>
    {
        private static List<string> ListPropertyDetailsParamNotPresent = new List<string>
        {
               "\"agent name\":", "\"articleTemplate\":","\"isEmbeddedApp\":",  "\"agencyIds1\":", "\"agencyIds2\":", "\"topSpotAgency\":",
               "\"bathroomsFrom\":","\"bathroomsTo\":","\"bedroomsFrom\":","\"bedroomsTo\":","\"carSpaces\":","\"geoType\":","\"keywords\":",
               "\"landsizeTo\":","\"priceFrom\":","\"priceTo\":","\"mapSearch\":","\"propertyFeatures\":","\"propertyTypeIds\":","\"propertyTypeIds1\":",
               "\"resultsPages\":","\"landsizeFrom\":","\"resultsRecords\":","\"resultsRecords1\":","\"resultsRecords2\":",               
               "\"isDreamHomes\":","\"isFeaturedProperty\":","\"estimateAvailable\":","\"rentalsAvailable\":","\"salesAvailable\":","\"dateOfPurchase\":",
               "\"subCategory2\":","\"subCategory3\":","\"subCategory4\":","\"articleTags\":","\"sortBy\":","\"sessionToken\"",
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListPropertyDetailsParamNotPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }

    public class PropertyDetailsDigitalDataParameterPresent : IEnumerable<object[]>
    {
        private static List<string> ListPropertyDetailsParamPresent = new List<string>
        {
            "\"author\": \"26376\"","\"address\": \"1-5 Nikola Street, Beadell WA 6440\"","\"adType\": \"premiumplus\"","\"bedrooms\": \"3\"","\"bathrooms\": \"2\"","\"landsize\":","\"buildingsize\":","\"parking\":",
            "\"photoCount\":","\"postcode\":","\"price\":","\"propertyId\":","\"resultsPosition\":","\"state\": \"WA\"","\"suburb\": \"Beadell",
            "\"videoCount\": \"0\"","\"agentNames\":", "\"brand\": \"domain\"","\"generator\": \"DO\"", "\"pageId\": \"2012105439\"",
            "\"pageName\": \"property details - buy - 2012105439 - 1-5 nikola street beadell wa 6440\"", "\"sysEnv\": \"desktop\"",
            "\"primaryCategory\": \"Buy\"","\"subCategory1\": \"Property Details\"","\"pageType\": \"Listing\"","\"profileId\": \"\"",
            "\"membershipType\": \"visitor\"","\"membershipState\": \"Not_logged_in\"","\"agency\":","\"effectiveDate\":", "\"issueDate\":","\"suburbId\": \"19148\"" ,"\"primaryPropertyType\": \"House\"","\"secondaryPropertyType\": \"House\"",
            "\"emailHash\": \"\"","\"ipAddress\": ","\"version\": \"1.0\"","\"events\": []","\"propertyFeatures\":","\"state\":","\"suburbId\":"
        };
        

        private List<object[]> ListTestData
        {
            get
            {
                return ListPropertyDetailsParamPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class PageSourcePropertyDetailsTests : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.WebServer);
        private static string Url { get; set; }

        public PageSourcePropertyDetailsTests()
        {
        }
        [Theory]
        [ClassData(typeof(PropertyDetailsDigitalDataParameterNotPresent))]
        public void PageSource_Digital_Data_Property_Details_Parameter_Not_Present(string param)
        {
            Url = _baseUri.ToString() + "/2012105439";

            ParsePage(Url)
                .ShouldNotContainDigitalDataParam(param);
        }
        [Theory]
        [ClassData(typeof(PropertyDetailsDigitalDataParameterPresent))]
        public void PageSource_Digital_Data_Property_Details_Parameter_Present(string param)
        {
            Url = _baseUri.ToString() + "/2012105439";

            ParsePage(Url)
                .ShouldContainDigitalDataParam(param);
        }
    }
}
