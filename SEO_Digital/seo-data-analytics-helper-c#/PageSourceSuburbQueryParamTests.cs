using System;
using Domain.Search.Urls.Parameters;
using DomainSEO.Infrastructure;
using DomainSEO.Infrastructure.Driver;
using DomainSEO.Infrastructure.xUnit.Framework;
using Xunit;

namespace DomainSEO.Tests.Regression.ConsumerSite.PageSourceTests
{
    [Trait(TraitConstants.TEST_SUITE, TraitConstants.REGRESSION)]
    public class ViewPageSourceSuburbQuery : BaseTest, IClassFixture<DriverFixture>
    {
        private readonly Uri _baseUri = new Uri(ConfigurationHelper.DomainWebServer);
        private static string Url { get; set; }

        [UITheory]      
        [InlineData(ListingType.Sale, "?ptype=house")]
        [InlineData(ListingType.Rent, "?ptype=house")]
        [InlineData(ListingType.Share, "?ptype=house")]
        [InlineData(ListingType.Sold, "?ptype=house")]
        [InlineData(ListingType.Sale, "?bedrooms=2")]
        [InlineData(ListingType.Rent, "?bedrooms=2")]
        [InlineData(ListingType.Share, "?bedrooms=2")]
        [InlineData(ListingType.Sold, "?bedrooms=2")]
        [InlineData(ListingType.Sale, "?bathrooms=2")]
        [InlineData(ListingType.Rent, "?bathrooms=2")]
        [InlineData(ListingType.Share, "?bathrooms=2")]
        [InlineData(ListingType.Sold, "?bathrooms=2")]
        [InlineData(ListingType.Sale, "?carspaces=1")]
        [InlineData(ListingType.Rent, "?carspaces=1")]
        [InlineData(ListingType.Share, "?carspaces=1")]
        [InlineData(ListingType.Sold, "?carspaces=1")]
        [InlineData(ListingType.Sale, "?features=Gas")]
        [InlineData(ListingType.Rent, "?features=Gas")]
        [InlineData(ListingType.Share, "?features=Gas")]
        [InlineData(ListingType.Sold, "?features=Gas")]
        [InlineData(ListingType.Sale, "?landsize=0-100")]
        [InlineData(ListingType.Rent, "?landsize=0-100")]
        [InlineData(ListingType.Share, "?landsize=0-100")]
        [InlineData(ListingType.Sold, "?landsize=0-100")]
        [InlineData(ListingType.Sale, "?keywords=waterfront")]
        [InlineData(ListingType.Rent, "?keywords=waterfront")]
        [InlineData(ListingType.Share, "?keywords=waterfront")]
        [InlineData(ListingType.Sold, "?keywords=waterfront")]
        public void ViewPageSource_Suburb_Query(ListingType mode, string query)
        {
            Url =
                BuildUrl()
                    .SetLocation(state: null)
                    .SetParameters(mode)
                    .Perform(_baseUri) + query;

            ParsePage(Url)
                .VerifyRobotsPresentWithNoIndexFollow()
                .VerifyCanonicalNotPresent();
        }

        [UITheory]
        [InlineData(ListingType.Sale, "?suburb=pyrmont-nsw-2009,sydney-nsw-2000")]
        [InlineData(ListingType.Rent, "?suburb=pyrmont-nsw-2009,sydney-nsw-2000")]
        [InlineData(ListingType.Share, "?suburb=pyrmont-nsw-2009,sydney-nsw-2000")]
        [InlineData(ListingType.Sold, "?suburb=pyrmont-nsw-2009,sydney-nsw-2000")]
        [InlineData(ListingType.Sold, "?suburb=pyrmont-nsw-2009,sydney-nsw-2000")]
        public void ViewPageSource_Suburb_Query_Suburb(ListingType mode, string query)
        {
            Url =
                BuildUrl()
                    .SetLocation(state: null)
                    .SetParameters(mode)
                    .Perform(_baseUri) + query;

            ParsePage(Url)
                .VerifyRobotsPresentWithNoIndexFollow()
                .VerifyURLWithQuerySuburbCanonical();
        }
    }
}