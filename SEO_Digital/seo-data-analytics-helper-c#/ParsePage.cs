using System;
using System.Net;
using Should;

namespace DomainDigitalData.Core
{
    public class ParsePage
    {
        public ParsePage(string url)
        {
            using (var webClient = new WebClient())
            {
                PageSource = webClient.DownloadString(url);
            }
            Url = url;
        }

        private string Url { get; set; }
        private string PageSource { get; }


        public ParsePage ShouldContainDigitalDataParam(string param)
        {           
            PageSource.ShouldContain(param); // RB: Check if the required parameter is present in the page
            return this;
        }
        public ParsePage ShouldNotContainDigitalDataParam(string param)
        {
            PageSource.ShouldNotContain(param); // RB: Check if the required parameter is present in the page
            return this;
        }
    }
}
