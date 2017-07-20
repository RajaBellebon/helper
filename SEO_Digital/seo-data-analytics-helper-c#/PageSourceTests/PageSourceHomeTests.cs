using DomainDigitalData.Tests;
using System;
using OpenQA.Selenium;
using DomainDigitalData.Infrastructure;
using Xunit;
using Domain.Search.Urls.Parameters;
using DomainDigitalData.Core;
using System.Collections.Generic;
using Domain.Search.Urls.Builder;
using Xunit.Sdk;
using System.Collections;
using System.Linq;

namespace DomainDigitalData.Tests.PageSourceTests
{
    public class HomeDigitalDataParameterNotPresent : IEnumerable<object[]>
    {
        private static List<string> ListHomeParamNotPresent = new List<string>
        {
               "\"agencyId\":", "\"agent name\":", "\"author\":","\"pageId\":", "\"effectiveDate\":", "\"issueDate\":", "\"articleTemplate\":",
               "\"suburbId\":", "\"isEmbeddedApp\":",  "\"agencyIds\":", "\"agencyIds1\":", "\"agencyIds2\":", "\"agencyTopspot\":", "\"agencyName\":",
               "\"bathroomsFrom\":","\"bathroomsTo\":","\"bedroomsFrom\":","\"bedroomsTo\":","\"carSpaces\":","\"geoType\":","\"keywords\":","\"landsizeFrom\":",
               "\"landsizeTo\":","\"medianPrice\":","\"priceFrom\":","\"priceTo\":","\"primaryPropertyType\":","\"secondaryPropertyType\":","\"resultsRecords1\":",
               "\"propertyFeatures\":","\"propertyTypeIds\":","\"propertyTypeIds1\":","\"resultsPages\":","\"resultsRecords\":","\"resultsRecords2\":",
               "\"topspotResults\":","\"searchArea\":","\"searchDepth\":","\"searchLocationCat\":","\"searchRegion\":","\"searchResultCount\":",
               "\"searchTypeView\":","\"sortBy\":","\"state\":","\"surroundingSuburbs\":","\"mapSearch\":","\"address\":","\"searchSuburb\":","\"searchTerm\":",
               "\"adType\":","\"bedrooms\":","\"bathrooms\":","\"floorPlansCount\":","\"landsize\":","\"buildingsize\":","\"parking\":","\"photoCount\":",
               "\"postcode\":","\"price\":","\"propertyId\":","\"resultsPosition\":","\"region\":","\"area\":","\"suburb\":","\"estimateAvailable\":","\"rentalsAvailable\":",
               "\"videoCount\":","\"agency\":","\"agentNames\":","\"listingPageType\":","\"projectType\":","\"isDreamHomes\":","\"isFeaturedProperty\":",
               "\"salesAvailable\":","\"dateOfPurchase\":","\"subCategory2\":","\"subCategory3\":","\"subCategory4\":","\"articleTags\":","\"sessionToken\""
        };  

        private List<object[]> ListTestData
        {
            get
            {
                return ListHomeParamNotPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }
        
        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }

    public class HomeDigitalDataParameterPresent : IEnumerable<object[]>
    {
        private static List<string> ListHomeParamPresent = new List<string>
        {
            "\"brand\": \"domain\"","\"generator\": \"DO\"","\"pageName\": \"homepage\"", "\"sysEnv\": \"desktop\"","\"primaryCategory\": \"Home\"","\"subCategory1\": \"Index\"",
            "\"pageType\": \"Homepage\"","\"profileId\": \"\"","\"membershipType\": \"visitor\"","\"membershipState\": \"Not_logged_in\"",
            "\"emailHash\": \"\"","\"ipAddress\": ","\"version\": \"1.0\"","\"events\": []"
        };

        private List<object[]> ListTestData
        {
            get
            {
                return ListHomeParamPresent.Select(x => new object[] { x }).Distinct().ToList();
            }
        }

        public IEnumerator<object[]> GetEnumerator()
        { return ListTestData.GetEnumerator(); }

        IEnumerator IEnumerable.GetEnumerator()
        { return GetEnumerator(); }
    }
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class ViewPageDigitalDataHome : BaseTest
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.WebServer);
        private static string Url { get; set; }

        public ViewPageDigitalDataHome()
        { 
        }

        [Theory]
        [ClassData(typeof(HomeDigitalDataParameterNotPresent))]
        public void PageSource_Digital_Data_Home_Parameter_Not_Present(string param)
        {
            Url =_baseUri.ToString();

            ParsePage(Url)
                .ShouldNotContainDigitalDataParam(param);
        }
        [Theory]
        [ClassData(typeof(HomeDigitalDataParameterPresent))]
        public void PageSource_Digital_Data_Home_Parameter_Present(string param)
        {
            Url = _baseUri.ToString();

            ParsePage(Url)
                .ShouldContainDigitalDataParam(param);
        }
    }
} 