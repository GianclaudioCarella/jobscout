using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SerpApi;
using System.Collections;
using System.Text;

namespace jobscout_web.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobsController : ControllerBase
    {       
        private readonly ILogger<JobsController> _logger;

        public JobsController(ILogger<JobsController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetJobs")]
        public IEnumerable<JobScoutResult> Get(string jobTitle, string location, string companies)
        {
            String apiKey = "";

            Hashtable ht = new Hashtable();
            ht.Add("q", "Jobs in " + location + " for " + jobTitle + "in these companies: " + companies);
            ht.Add("location", location);
            ht.Add("hl", "en");
            ht.Add("gl", "us");
            ht.Add("google_domain", "google.com");

            StringBuilder stringBuilder = new StringBuilder();
            List<JobScoutResult> jobScoutResultsList = new List<JobScoutResult>();

            try
            {
                GoogleSearch search = new GoogleSearch(ht, apiKey);
                JObject data = search.GetJson();
                JArray results = (JArray)data["organic_results"];

                foreach (JObject result in results)
                {
                    JobScoutResult jobScoutResult = new JobScoutResult() { Title = result["title"].ToString(), Url = result["link"].ToString() };
                    jobScoutResultsList.Add(jobScoutResult);
                }
            }
            catch (SerpApiSearchException ex)
            {
                Console.WriteLine("Exception:");
                Console.WriteLine(ex.ToString());
            }

            return jobScoutResultsList;
        }
    }

    public class JobScoutResult
    {
        public string Title { get; set; }
        public string Url { get; set; }
    }
}
