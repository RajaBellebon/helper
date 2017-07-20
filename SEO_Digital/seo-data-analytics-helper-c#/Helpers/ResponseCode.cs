using DomainSEO.Infrastructure;
using System;
using Should;
using System.Net;


namespace DomainSEO.Core.Helpers
{
    public class ResponseCode
    {
        public ResponseCode(string url)
        {
            HttpWebRequest webRequest = HttpWebRequest.Create(url) as HttpWebRequest;
            try
            {
                HttpCode = webRequest.GetResponse() as HttpWebResponse;
            }
            catch (WebException we)
            {
                HttpCode = (HttpWebResponse)we.Response;
            }
       
            StatusCodeURL = (int)HttpCode.StatusCode;
            Url = url;

        }
        private string Url { get; set; }
        private HttpWebResponse HttpCode { get; set; }
        private int StatusCodeURL { get; set; }
        
        public ResponseCode IsValidURL()
        {
            StatusCodeURL.ShouldEqual(200); // OK
            return this;
        }

        public ResponseCode IsRedirected()
        {
            StatusCodeURL.ShouldBeInRange(300, 308); // Redirection
            return this;
        }

        public ResponseCode IsInvalidClient()
        {
            StatusCodeURL.ShouldBeInRange(400,451); // Client Error
            return this;
        }
        public ResponseCode IsGone()
        {
            StatusCodeURL.ShouldEqual(410); // Gone
            return this;
        }

        public ResponseCode IsInvalidServer()
        {
            StatusCodeURL.ShouldBeInRange(500, 511); // Client Error
            return this;
        }
    }
}