using DomainDigitalData.Tests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using OpenQA.Selenium;
using DomainDigitalData.Infrastructure;
using Domain.Search.Urls.Parameters;

namespace DomainDigitalData.Tests.PageSourceTests
{
    public class SearchDigitalDataParameterNotPresent : IEnumerable<object[]>
    {
        private static List<string> ListSearchParamNotPresent = new List<string>
        {
               "\"agencyId\":", "\"agent name\":", "\"author\":","\"effectiveDate\":", "\"issueDate\":", "\"articleTemplate\":",
               "\"isEmbeddedApp\":",  "\"agencyIds1\":", "\"agencyIds2\":",  "\"agencyName\":","\"landsizeTo\":","\"mapSearch\":","\"postcode\":",
               "\"priceFrom\":","\"priceTo\":","\"resultsPages\":","\"landsizeFrom\":","\"resultsRecords\":","\"resultsRecords1\":","\"resultsRecords2\":",
               "\"address\":","\"adType\":", "\"bedrooms\":","\"bathrooms\":","\"floorPlansCount\":","\"landsize\":","\"buildingsize\":","\"parking\":",
               "\"photoCount\":","\"price\":","\"propertyId\":","\"resultsPosition\":","\"videoCount\":","\"agentNames\":","\"listingPageType\":",
               "\"projectType\":","\"propertyFeatures\":","\"primarypropertyType\":","\"secondaryPropertyType\":","\"isDreamHomes\":","\"isFeaturedProperty\":",
               "\"estimateAvailable\":","\"rentalsAvailable\":","\"salesAvailable\":","\"dateOfPurchase\":","\"subCategory2\":",
               "\"subCategory3\":","\"subCategory4\":","\"articleTags\":","\"agency\":", "\"sessionToken\"",
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListSearchParamNotPresent.Select(x => new object[] { x }).ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }

    public class SearchDigitalDataParameterPresent : IEnumerable<object[]>
    {
        private static List<string> ListSearchParamPresent = new List<string>
        {
            "\"brand\": \"domain\"","\"generator\": \"DO\"", "\"pageId\": \"search results - buy\"","\"pageName\": \"search results - buy\"", "\"sysEnv\": \"desktop\"","\"primaryCategory\": \"Buy\"","\"subCategory1\": \"Search Results\"",
            "\"pageType\": \"Search Page\"","\"profileId\": \"\"","\"membershipType\": \"visitor\"","\"membershipState\": \"Not_logged_in\"",
            "\"emailHash\": \"\"","\"ipAddress\": ","\"version\": \"1.0\"","\"events\": []", "\"agencyIds\":",
            "\"topSpotAgency\":","\"geoType\":","\"mapSearch\":","\"medianPrice\":","\"postcode\":","\"primaryPropertyType\":","\"secondaryPropertyType\":",
            "\"propertyFeatures\":","\"propertyTypeIds\":","\"resultsPages\":","\"landsizeFrom\":","\"resultsRecords\":", "\"topspotResults\":","\"searchDepth\":","\"searchLocationCat\":","\"searchResultCount\":","\"searchSuburb\":","\"searchTerm\":",
            "\"searchTypeView\":","\"sortBy\":","\"state\":","\"suburbId\":","\"surroundingSuburbs\":"
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListSearchParamPresent.Select(x => new object[] { x }).ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class PageSourceSearchTests : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.WebServer);
        private static string Url { get; set; }

        public PageSourceSearchTests()
        {
        }
        [Theory]
        [ClassData(typeof(SearchDigitalDataParameterNotPresent))]
        public void PageSource_Digital_Data_Search_Parameter_Not_Present(string param)
        {
            Url =
                BuildUrl()
                .SetLocation(state: State.NSW, suburb: "Coogee", postcode: "2034")
                .SetParameters(mode: ListingType.Sale)
                .Perform(_baseUri);

            ParsePage(Url)
                .ShouldNotContainDigitalDataParam(param);
        }
        [Theory]
        [ClassData(typeof(SearchDigitalDataParameterPresent))]
        public void PageSource_Digital_Data_Search_Parameter_Present(string param)
        {
            Url = 
                BuildUrl()
                .SetLocation(state: State.NSW, suburb: "Coogee", postcode: "2034")
                .SetParameters(mode: ListingType.Sale)
                .Perform(_baseUri);

            ParsePage(Url)
                .ShouldContainDigitalDataParam(param);
        }

    }

}
