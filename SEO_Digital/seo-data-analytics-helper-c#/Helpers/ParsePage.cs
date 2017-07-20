using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;
using Domain.Search.Urls.Parameters;
using DomainSEO.Infrastructure;
using Should;

namespace DomainSEO.Core.Helpers
{
    public class ParsePage
    {
        public ParsePage(string url)
        {
            var myUri = new Uri(url);

            //PageSource = new TimedWebClient { Timeout = 600000 }.DownloadString(url);
            using (var webClient = new WebClient())
            {
                webClient.Encoding = System.Text.Encoding.GetEncoding("windows-1254");
                PageSource = webClient.DownloadString(myUri);
                //webClient.Dispose();
            }
            Url = url;
        }       

        private string Url { get; set; }
        private string PageSource { get; }
        private int CountUI { get; set; }

        /// <summary>
        ///     * This method will check for Sold, Sale, Rent
        ///     and any URLwithout a query type('?' +query type):
        ///     - If the canonical link is present
        ///     - If the meta robots tag
        ///     < NOINDEX, NOFOLLOW>
        ///         is present
        ///         - If the link for next page is present and in a correct format
        ///         * Any pages which contains an URLs with a query type have to contain
        ///         the meta robots tag
        ///         < NOINDEX, FOLLOW>
        ///             .
        ///             * For any Share listings, the method will *not* check
        ///             if the next link is present
        /// </summary>
        /// <param name="mode"></param>
        public ParsePage VerifyPageSource(ListingType mode)
        {
            if (mode != ListingType.Share)
            {
                if (Url.Contains("?"))
                {
                    var cutUrl = Url.Split('?');
                    Url = cutUrl[0];
                    VerifyCanonicalPresent();
                    VerifyRobotsPresentWithNoIndexFollow();
                    PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "?page=2\"");
                }
                else
                {
                    if (Url.Contains("auction"))
                    {
                        Url = Url.Replace("http", "https");
                        VerifyCanonicalPresent();
                        VerifyRobotsNotPresent();
                    }
                    else
                    {
                        VerifyCanonicalPresent();
                        if (Url.Contains("sold"))
                        { VerifyRobotsPresentWithNoIndexFollow(); }
                        else { VerifyRobotsNotPresent(); }
                        PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "?page=2\"");
                        //RB: Checking next link
                    }
                }
            }
            else
            {
                if (Url.Contains("?"))
                {
                    var cutUrl = Url.Split('?');
                    Url = cutUrl[0];
                    VerifyCanonicalPresent();
                    VerifyRobotsPresentWithNoIndexFollow();
                }
                else
                {
                    VerifyCanonicalPresent();
                    VerifyRobotsNotPresent();
                }
            }
            return this;
        }

        public ParsePage VerifyText(string text)
        {   
            PageSource.ShouldContain(text);
            return this;
        }

        public ParsePage VerifyTextNotPresent(string text)
        {
            PageSource.ShouldNotContain(text);
            return this;
        }

        /// <summary>
        ///     * This method will check for any  URLs without a query type('?' +query type):
        ///     - If the canonical link is present
        ///     - If the meta robots tag
        ///     < NOINDEX, NOFOLLOW>
        ///         is present
        ///         - If the link for next page is present and in a correct format
        ///         * Any pages which contains an URLs with a query type have to contain
        ///         the meta robots tag
        ///         < NOINDEX, FOLLOW>
        ///             .
        ///             * For any Share listings, the method will *not* check
        ///             if the next link is present
        /// </summary>
        public ParsePage VerifyHomeBuy()
        {
            if (Url.Contains("?"))
            {
                VerifyRobotsPresentWithNoIndexFollow();
                VerifyCanonicalPresent();
                PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "?page=2\"");
            }
            else
            {
                VerifyRobotsNotPresent();
                VerifyCanonicalPresent();
                PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "?page=2\"");
                //RB: Checking next link
            }
            return this;
        }

        public ParsePage VerifyHomeBuyNoNext()
        {
            if (Url.Contains("?"))
            {
                VerifyRobotsPresentWithNoIndexFollow();
            }
            VerifyCanonicalPresent();
            return this;
        }

        public ParsePage VerifyMethodPageSourceNextAmp(ListingType mode)
        {
            if (mode != ListingType.Share)
            {
                VerifyRobotsPresentWithNoIndexFollow();
                VerifyCanonicalNotPresent();
            }
            else
            {
                VerifyCanonicalPresent();
                VerifyRobotsPresentWithNoIndexNoFollow();
            }
            if (Url.Contains("&"))
            {
                var url1 = Url.Replace("&", "&amp;");
                PageSource.ShouldContain("<link rel=\"next\" href=\"" + url1 + "&amp;page=2\"");
                //RB: Checking next link
            }
            else
            {
                VerifyNextAmp();
            }
         
            return this;
        }

        //public ParsePage VerifyPageSourceNewHomes()
        //{
        //    Url = _baseUri + "search/newdev/property/types/new-home-designs/state/nsw/";
        //    VerifyNoIndexNoFollow();
        //    PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "?mode=newdev&amp;page=2\"");
        //    //RB: Checking next link
        //    return this;
        //}

        public ParsePage VerifyPageSourceNoNext()
        {
            if (Url.Contains("?") && !Url.Contains("displaymap"))
            {
                var cutUrl = Url.Split('?');
                Url = cutUrl[0];
                VerifyRobotsPresentWithNoIndexFollow();
                VerifyCanonicalNotPresent();
            }
            else if (Url.Contains("displaymap"))
            {
                PageSource.ShouldContain("meta name=\"robots\" content=\"NOINDEX, NOFOLLOW\"");
                VerifyCanonicalPresent();
                //RB: In case of Map search
            }
            else
            {
                VerifyCanonicalPresent();
                VerifyRobotsPresentWithNoIndexNoFollow();
            }
            return this;
        }

        /// <summary>
        ///     This methods checks the url contains in the link next
        /// </summary>
        public ParsePage VerifyNextAmp() 
        {
            PageSource.ShouldContain("<link rel=\"next\" href=\"" + Url + "&amp;page=2\""); //RB: Checking next link
            return this;
        }

        public ParsePage VerifyMetaMobileLinkPresent()
        {
            PageSource.ShouldNotContain("link id=\"MetaMobileLink\""); //RB: Checking Metamobile link
            return this;
        }

        public ParsePage VerifyCanonicalPresent()
        {
            if (Url.Contains("?"))
            {
                var cutUrl = Url.Split('?');
                Url = cutUrl[0];
                PageSource.ShouldContain("link rel=\"canonical\" href=\"" + Url + "\"");
                //RB: Checking Canonical link              
            }
            return this;
        }

        public ParsePage VerifyURLWithQuerySuburbCanonical()
        {
            if (Url.Contains("?"))
            {
                var cutUrl = Url.Replace("?suburb=", "").Trim();
                Url = cutUrl;
                PageSource.ShouldContain("link rel=\"canonical\" href=\"" + Url + "\"");
                //RB: Checking Canonical link              
            }
            return this;
        }
        public ParsePage VerifyUrlRedirectingArchived()
        {
           PageSource.ShouldContain("104 Kings Creek Road, Krambach NSW 2429 - House For Sale - 2012757829"); //RB: Checking the title of the page
           return this;
        }

        public ParsePage VerifyUrlRedirecting()
        {
            PageSource.ShouldContain("Beadell WA 6440"); //RB: Checking the title of the page
            return this;
        }
     
        public ParsePage VerifyUrlRedirectingHPG()
        {
            PageSource.ShouldContain("property-profile"); //RB: Checking the title of the page
            return this;
        }

        public ParsePage VerifyUrlRedirectingSearch()
        {
            PageSource.ShouldContain("sale"); //RB: Checking the title of the page
            return this;
        }

        public ParsePage GetCountResults(int count)
        {
            var st = Regex.Split(PageSource, "strong");
            var ts = Regex.Split(st[3], "Properties");
            CountUI = Convert.ToInt32(ts[0].Replace(">", "").Trim());
            count.ShouldEqual(CountUI);
            return this;
        }
        
        //public ParsePage GetCountResults1()
        //{
        //    var st = Regex.Split(PageSource, "Domain has");
        //    var ts = Regex.Split(st[1], "properties");
        //    CountUI = Convert.ToInt32(ts[0]);
        //    List<int> countUIPage = new List<int>();
        //    countUIPage.Add(CountUI);
        //    return this;
        //}
        public ParsePage VerifyRobotsPresentWithNoIndexFollow()
        {
            PageSource.ShouldContain("meta name=\"robots\" content=\"NOINDEX, FOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"NOINDEX, NOFOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"INDEX, NOFOLLOW\"");
            return this;
        }

        public ParsePage VerifyRobotsPresentWithNoIndexNoFollow()
        {
            PageSource.ShouldContain("meta name=\"robots\" content=\"NOINDEX, NOFOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"NOINDEX, FOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"INDEX, NOFOLLOW\"");
            return this;
        }

        public ParsePage VerifyCanonicalNotPresent()
        {
            PageSource.ShouldNotContain("link rel=\"canonical\"");
            return this;
        }

        public ParsePage VerifyRobotsNotPresent()
        {
            PageSource.ShouldNotContain("meta name=\"robots\"");
            return this;
        }

        public ParsePage VerifyNextLinkNotPresent()
        {
            PageSource.ShouldNotContain("link rel=\"next\"");
            return this;
        }

        public ParsePage VerifyPreviousLinkNotPresent()
        {
            PageSource.ShouldNotContain("link rel=\"prev\"");
            return this;
        }

        public ParsePage VerifyNextLinkPresent()
        {
            PageSource.ShouldContain("link rel=\"next\" href=\"");
            return this;
        }

        public ParsePage VerifyNextLinkContains(string s)
        {
            PageSource.ShouldContain(s);
            return this;
        }

        public ParsePage VerifyPreviousLinkPresent()
        {
            PageSource.ShouldContain("link rel=\"prev\" href=\"");
            return this;
        }
        public ParsePage VerifyNonRelAmp(string address)
        {
            PageSource.ShouldContain("link rel=\"amphtml\" href=\"" + ConfigurationHelper.DomainWebServer + "/amp/" + address + "\"");
            return this;
        }

        public ParsePage VerifyRelAmp()
        {
            PageSource.ShouldNotContain("link rel=\"amphtml\" href=\"");
            return this;
        }

        public ParsePage VerifyCanonicalToDesktopListingPresent(string desktopListingUrl)
        {           
            PageSource.ShouldContain("link rel=\"canonical\" href=\"" + desktopListingUrl + "\"");
            return this;
        }
        public ParsePage VerifyCanonicalToDesktopListingAddressPresent(string address)
        {
            var desktopListingUrl = ConfigurationHelper.DomainWebServer + "/" + address + "-" + Regex.Match(Url, @"\d+").Value;
            PageSource.ShouldContain("link rel=\"canonical\" href=\"" + desktopListingUrl + "\"");
            return this;
        }

        public ParsePage VerifyCanonicalToDesktopSearchPagePresent(string desktopSearchUrl)
        {           
            PageSource.ShouldContain("link rel=\"canonical\" href=\"" + desktopSearchUrl + "\"");
            return this;
        }

        public ParsePage VerifyRobotsPresentWithIndexFollow()
        {
            PageSource.ShouldContain("meta name=\"robots\" content=\"index, follow\"");
                //RB: there is an issue with lower case, to be consistent it should be <meta name="robots" content="INDEX, FOLLOW" />
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"NOINDEX, NOFOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"NOINDEX, FOLLOW\"");
            PageSource.ShouldNotContain("meta name=\"robots\" content=\"INDEX, NOFOLLOW\"");
            return this;
        }

        public ParsePage VerifyPropertyProfileForSold(string mode, string address)
        {
            var propertyProfileUrl = ConfigurationHelper.DomainWebServer + "/property-profile/" + address + "-" + Regex.Match(Url, @"\d+").Value;
            if (mode == "Sold")
            {               
                PageSource.ShouldContain(propertyProfileUrl);
            }
            else
            {
                PageSource.ShouldNotContain(propertyProfileUrl);
            }
           return this;
        }
        public ParsePage VerifyJsonIdBreadCrumpListIsContained()
        {
            PageSource.ShouldContain("@type\":" +"\"" +"BreadcrumbList" +"\"");
            return this;
        }
        public ParsePage VerifyJsonIdIsnpectionTimeIsContained()
        {
            PageSource.ShouldContain("@type\":" + "\"" + "Event" + "\"" + "," + "\"" + "name\":" + "\"" +"Inspection"  + "\"");
            return this;
        }
        public ParsePage VerifyJsonIdContainedProperUrl()
        {
            PageSource.ShouldContain("@id\":" + "\"" + Url +"\"");
            return this;
        }

        public ParsePage VerifyPresent(string s)
        {
            PageSource.ShouldContain(s);
            return this;
        }
    }
}