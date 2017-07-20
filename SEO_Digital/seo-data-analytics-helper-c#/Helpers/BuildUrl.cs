using System;
using Domain.Search.Urls.Builder;
using Domain.Search.Urls.Parameters;

namespace DomainSEO.Core.Page
{
    public class BuildUrl
    {
        private SearchUrlBuilder _builder;
        public SearchLocation SearchLocation;
        public SearchParametersV1 SearchParameters;

        public BuildUrl SetLocation(string region = null, string suburb = null, string area = null,
            string postcode = null, string loc = null, State? state = State.NSW)
        {
            var location = new SearchLocation
            {
                Suburb = suburb,
                Region = region,
                State = state,
                PostCode = postcode,
                Area = area // RB: it can be replaced by different type of SearchLocationCategory with the ?
                //Category = SearchLocationCategory.Area,
            };

            SearchLocation = location;
            return this;
        }

        public BuildUrl SetParameters(ListingType mode = ListingType.Sale, PropertyType? propertyType = null,
            int? maxBed = null, int? minBed = null, int? maxBath = null, int? minBath = null,
            int? maxCar = null, int? minCar = null, int? maxPrice = null, int? minPrice = null,
            SearchPropertyFeature? propertyFeature = null, int? maxLand = null, int? minLand = null,
            string[] keyWords = null, bool map = false, int[] adId = null)
        {
            var parametersV1 = new SearchParametersV1
            {
                ListingType = mode,
                //LocationTerms = loc
                Locations = new[] {SearchLocation},
                PropertyTypes = propertyType == null ? new PropertyType[] {} : new[] {propertyType.Value},
                MaxBedrooms = maxBed,
                MinBedrooms = minBed,
                MaxBathrooms = maxBath,
                MinBathrooms = minBath,
                MaxCarspaces = maxCar,
                MinCarspaces = minCar,
                MaxPrice = maxPrice,
                MinPrice = minPrice,
                PropertyFeatures =
                    propertyFeature == null ? new SearchPropertyFeature[] {} : new[] {propertyFeature.Value},
                MaxLandArea = maxLand,
                MinLandArea = minLand,
                Keywords = keyWords,
                DisplayMap = map
            };

            SearchParameters = parametersV1;
            return this;
        }

        public string Perform(Uri baseUri)
        {
            _builder = new SearchUrlBuilder(baseUri);
            return _builder.BuildUrl(SearchParameters);
        }
    }
}