/* eslint-disable max-len */
const deviceMobileList = ['iPhone', 'android', 'iPad'];
const deviceDesktopList = ['chrome', 'firefox', 'ie', 'safari'];
const deviceListTotal = deviceDesktopList.concat(deviceMobileList);

module.exports = {
  default: {
    waitForConditionTimeout: 10000,
    deviceMobileList,
    deviceDesktopList,
    deviceListTotal,
    screenResolution: {
      mobile: {
        width: 320,
        height: 568,
      },
      desktop: {
        width: 1440,
        height: 900,
      },
      iPad34: {
        width: 1536,
        height: 2048,
      },
      iPad12: {
        width: 768,
        height: 1024,
      },
      nexus: {
        width: 1600,
        height: 2560,
      },
    },
    crumbs: {
      check: ['Home', 'NSW', 'Vaucluse'],
    },
    title: {
      home: 'Real Estate | Properties for Sale, Rent and Share | Domain',
      buy: 'Buy Houses, Apartments, Units, Flats and New Developments | Real Estate | Domain',
      rent: 'Rent Houses, Apartments, Units, Flats and New Developments | Real Estate | Domain',
      newHomes: 'New Homes | Home & Land Packages | Off the Plan Apartments',
      share: 'Share Houses, Apartments, Units, Flats and New Developments | Real Estate | Domain',
      sold: 'Sold Houses, Apartments, Units, Flats and New Developments | Real Estate | Domain',
    },
    navButtons: {
      name: ['Buy', 'Rent', 'New homes', 'Sold', 'Commercial', 'News', 'Advice', 'Agents', 'More'],
      href: [
        'domain.com.au/home?mode=buy', 'domain.com.au/home?mode=rent', 'domain.com.au/new-homes',
        'domain.com.au/home?mode=sold', 'commercialrealestate.com.au', 'domain.com.au/news/',
        'domain.com.au/advice/', 'domain.com.au/real-estate-agents', '',
      ],
    },
    moreButtons: {
      name: ['Share', 'Home Price Guide', 'Auction Results', 'Suburb Profiles', 'Home Loans', 'Place an ad'],
      href: [
        'domain.com.au/home?mode=share', 'domain.com.au/property-profile', 'domain.com.au/auction-results/',
        'domain.com.au/suburb-profile/', 'domain.com.au/home-loans', 'advertisers.com.au/domain',
      ],
    },
    newsButtons: {
      name: ['Home', 'Latest', 'Features', 'Insights', 'Videos', 'Market view'],
      href: [
        'domain.com.au/news/', 'domain.com.au/news/latest/', 'domain.com.au/news/features/',
        'domain.com.au/news/insights/', 'media.domain.com.au/property/domain', 'domain.com.au/news/market-view/',
      ],
    },
    adviceButtons: {
      name: ['Home', 'Buying', 'Design', 'Renovations', 'Investing', 'Selling', 'Good living', 'Property Reports'],
      href: [
        'domain.com.au/advice/', 'domain.com.au/advice/buying/', 'domain.com.au/advice/design/',
        'domain.com.au/advice/renovations/', 'domain.com.au/advice/investing/', 'domain.com.au/advice/selling/',
        'domain.com.au/advice/good-living/', 'domain.com.au/news/domain-property-reports/',
      ],
    },
    searchMoreOptions: {
      name: ['Property types', 'Price min', 'Price max', 'Bedrooms', 'Bathrooms', 'Parking'],
      optionsProperty: {
        types: ['House', 'Apartment', 'Land', 'Rural', 'New Developments'],
        subTypes: ['House sub-types', 'Apartment sub-types', 'Rural sub-types', 'New Developments sub-types'],
        optionsHouse: ['Duplex', 'Free standing', 'Semi detached', 'Terrace', 'Townhouse', 'Villa'],
        optionsHouseImg: ['duplex', 'house', 'semi detached', 'terrace', 'town-house', 'villa'],
        optionsHouseText: [
          'A single housing structure that is divided into two separate residences.',
          'A house that is not attached to any other house, building or structure.',
          'A house that is attached in some structural way to one or more dwellings, usually side-by-side.',
          'A row of adjoining, identical houses, each built to its side boundaries, usually of 19th-century design. Often includes two storeys and iron lace decoration.',
          'One of a group of dwellings sold under strata title, each sharing a common wall with another. Townhouses generally include ground floor access.',
          'A type of townhouse complex which contains, detached single story houses.',
        ],
        optionsApartment: ['Apartment / unit / flat', 'Block of units', 'Penthouse', 'Studio'],
        optionsApartmentImg: ['apartments', 'block-of-units', 'penthouse', 'studio'],
        optionsApartmentText: [
          'A self-contained housing unit that occupies only part of a building.',
          'An entire apartment building available for sale.',
          'A separate flat or maisonette on the top floor or floors of a building.',
          'Any single room apartment with combined living and kitchen areas.',
        ],
        optionsRural: ['Acreage / semi-rural', 'Farm', 'Rural'],
        optionsRuralImg: ['acreage', 'farm', 'rural'],
        optionsRuralText: [
          'A large allotment of land in a rural area.',
          'An area of land and its buildings, used for growing crops and rearing animals.',
          'A geographic area that is located outside of cities and towns.',
        ],
        optionsNewDev: [
          'Development site', 'House and land package', 'New home designs', 'Off the Plan / New apartments',
        ],
        optionsNewDevImg: [
          'development-site', 'new-house-and-land', 'new-home-designs', 'new-apartments',
        ],
        optionsNewDevText: [
          'A plot of land suitable for re-development into multi-home lots.',
          'Newly developed areas including newly built homes available for purchase.',
          'A pre-designed home suitable for development on a block of land owned by vendors.',
          'Properties that are advertised for sale before they have been built (it may be possible to inspect a demonstration property or show suite).',
        ],
      },
      optionsPriceMin: [
        'Any', '$50,000', '$100,000', '$150,000', '$200,000', '$250,000', '$300,000',
        '$350,000', '$400,000', '$450,000', '$500,000', '$550,000', '$600,000', '$650,000',
        '$700,000', '$750,000', '$800,000', '$850,000', '$900,000', '$950,000', '$1,000,000',
        '$1,100,000', '$1,200,000', '$1,300,000', '$1,400,000', '$1,500,000',
        '$1,600,000', '$1,700,000', '$1,800,000', '$1,900,000', '$2,000,000', '$2,250,000',
        '$2,500,000', '$2,750,000', '$3,000,000', '$3,500,000', '$4,000,000', '$5,000,000',
      ],
      optionsPriceMinRent: [
        'Any', '$50', '$100', '$150', '$200', '$250', '$300',
        '$350', '$400', '$450', '$500', '$550', '$600', '$650',
        '$700', '$750', '$800', '$850', '$900', '$950', '$1,000',
        '$1,500', '$2,000', '$3,000', '$4,000', '$5,000',
      ],
      optionsPriceMax: [
        'Any', '$50,000', '$100,000', '$150,000', '$200,000', '$250,000', '$300,000',
        '$350,000', '$400,000', '$450,000', '$500,000', '$550,000', '$600,000', '$650,000',
        '$700,000', '$750,000', '$800,000', '$850,000', '$900,000', '$950,000', '$1,000,000',
        '$1,100,000', '$1,200,000', '$1,300,000', '$1,400,000', '$1,500,000',
        '$1,600,000', '$1,700,000', '$1,800,000', '$1,900,000', '$2,000,000', '$2,250,000',
        '$2,500,000', '$2,750,000', '$3,000,000', '$3,500,000', '$4,000,000', '$5,000,000',
      ],
      optionsPriceMaxRent: [
        'Any', '$50', '$100', '$150', '$200', '$250', '$300',
        '$350', '$400', '$450', '$500', '$550', '$600', '$650',
        '$700', '$750', '$800', '$850', '$900', '$950', '$1,000',
        '$1,500', '$2,000', '$3,000', '$4,000', '$5,000',
      ],
      optionsOtherFiltersBed: ['Studio', '1', '2', '3', '4', '5+'],
      optionsOtherFilters: ['0', '1', '2', '3', '4', '5+'],
      optionsFeatures: [
        'All', 'Pets allowed', 'Swimming pool', 'Air conditioning', 'Built in wardrobes',
        'Gas', 'Garden / courtyard', 'Balcony / deck', 'Internal laundry', 'Study',
      ],
    },

    footerNavLink: {
      name: ['Help', 'Contact', 'About', 'Careers', 'Mobile', 'Place an ad', 'Agent centre'],
      href: [
        'https://support.domain.com.au/', 'https://stage.domain.com.au/group/contact-us/',
        'https://stage.domain.com.au/group/', 'https://stage.domain.com.au/group/career/',
        'https://stage.domain.com.au/mobile', 'https://advertisers.com.au/domain',
        'https://www.domain.com.au/group/agent-centre/',
      ],
    },

    footerQuickLinks: {
      names: [
        'States', 'Capital Cities', 'Capital Cities - Rentals', 'Popular Areas', 'Domain', 'Fairfax Network',
      ],
      options: [
        'NSW', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania',
        'ACT', 'Northern Territory', 'Sydney real estate', 'Melbourne real estate', 'Brisbane real estate',
        'Perth real estate', 'Adelaide real estate', 'Hobart real estate', 'Canberra real estate',
        'Darwin real estate', 'Sydney rental properties', 'Melbourne rental properties',
        'Brisbane rental properties', 'Perth rental properties', 'Adelaide rental properties',
        'Hobart rental properties', 'Canberra rental properties', 'Darwin rental properties',
        'Eastern Suburbs Sydney', 'Inner West Sydney', 'Lower North Shore',
        'East Melbourne', 'Bayside Melbourne', 'Sydney City', 'Inner City Melbourne', 'Upper North Shore',
        'Home Price Guide', 'Auction Results', 'Suburb Profiles', 'Privacy policy', 'Conditions of use',
        'Tracking & targeting policy', 'Oneflare', 'Sydney Morning Herald', 'The Age',
        'Brisbane Times', 'Wa Today', 'Canberra Times',
        'Full network', 'Domain Digital Editions', 'Drive',
      ],
      href: [
        'https://stage.domain.com.au/real-estate/buy/nsw/', 'https://stage.domain.com.au/real-estate/buy/vic/',
        'https://stage.domain.com.au/real-estate/buy/qld/', 'https://stage.domain.com.au/real-estate/buy/wa/',
        'https://stage.domain.com.au/real-estate/buy/sa/', 'https://stage.domain.com.au/real-estate/buy/tas/',
        'https://stage.domain.com.au/real-estate/buy/act/', 'https://stage.domain.com.au/real-estate/buy/nt/',
        'https://stage.domain.com.au/sale/sydney-nsw-2000/', 'https://stage.domain.com.au/sale/melbourne-vic-3000/',
        'https://stage.domain.com.au/sale/brisbane-city-qld-4000/', 'https://stage.domain.com.au/sale/perth-wa-6000/',
        'https://stage.domain.com.au/sale/adelaide-sa-5000/', 'https://stage.domain.com.au/sale/?area=hobart-tas',
        'https://stage.domain.com.au/sale/canberra-act-2600/', 'https://stage.domain.com.au/sale/darwin-nt-0800/',
        'https://stage.domain.com.au/rent/sydney-nsw-2000/', 'https://stage.domain.com.au/rent/melbourne-vic-3000/',
        'https://stage.domain.com.au/rent/brisbane-city-qld-4000/', 'https://stage.domain.com.au/rent/perth-wa-6000/',
        'https://stage.domain.com.au/rent/adelaide-sa-5000/', 'https://stage.domain.com.au/rent/?area=hobart-tas',
        'https://stage.domain.com.au/rent/canberra-act-2600/', 'https://stage.domain.com.au/rent/darwin-nt-0800/',
        'https://stage.domain.com.au/sale/?area=eastern-suburbs-nsw', 'https://stage.domain.com.au/sale/?area=inner-west-nsw',
        'https://stage.domain.com.au/sale/?area=north-shore-lower-nsw', 'https://stage.domain.com.au/sale/?area=east-vic',
        'https://stage.domain.com.au/sale/?area=bayside-vic', 'https://stage.domain.com.au/sale/?area=sydney-city-nsw',
        'https://stage.domain.com.au/sale/?area=inner-city-vic', 'https://stage.domain.com.au/sale/?area=north-shore-upper-nsw',
        'https://stage.domain.com.au/property-profile', 'https://stage.domain.com.au/auction-results/',
        'https://stage.domain.com.au/suburb-profile', 'http://www.fairfax.com.au/privacy.html',
        'http://www.fairfax.com.au/conditions.html', 'http://www.fairfax.com.au/tracking.html',
        'https://www.oneflare.com.au/', 'http://www.smh.com.au/', 'http://www.theage.com.au/',
        'http://www.brisbanetimes.com.au/', 'http://www.watoday.com.au/',
        'http://www.canberratimes.com.au/', 'http://www.fairfax.com.au/network-map.aspx',
        'https://www.domain.com.au/news/domain-digital-editions/', 'http://www.drive.com.au/',
      ],
    },

    sortFilters: {
      options: ['Featured', 'Newest', 'Lowest price', 'Highest price', 'Earliest inspection', 'Suburb'],
    },
    seoCards: {
      House: ['2 Beds', '3 Beds', '4 Beds', '5 Beds'],
      Units: ['1 Bed', '2 Beds', '3 Beds'],
    },
  },
};
