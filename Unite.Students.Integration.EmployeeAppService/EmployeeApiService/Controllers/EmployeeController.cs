using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using EmployeeApiService.Support;

namespace EmployeeApiService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeeController : ControllerBase
    {
        readonly IAuthenticationService _authService;
        readonly IEmployeeService _employeeService;
        private readonly ILogger<EmployeeController> _logger;
        public EmployeeController(ILogger<EmployeeController> logger, IConfiguration _configuration)
        {
            _logger = logger;
            _employeeService = new EmployeeService(_configuration);
            _authService = new AuthenticationService(_configuration); 
        }

        [HttpGet]
        [Route("test")]
        public string EmployeeTestApi()
        {
            return "Employee: API is ready!!"; 
        }

        [HttpGet]
        [Route("customers/{customerId}")]
        public async Task<IActionResult> GetCustomers(string customerId)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                string cookieToken = await _authService.GetPadCookie();
                var customersList = await _employeeService.GetCustomers(customerId, cookieToken);
                if(!string.IsNullOrEmpty(customersList) && customersList.IndexOf("Error") == -1)
                {
                    var jsonList = JObject.Parse(customersList);
                    return Ok(jsonList.ToString());
                }
                else if(!string.IsNullOrEmpty(customersList) && customersList.IndexOf("Error") != -1)
                {
                    return Ok(customersList);
                }
                else
                {
                    return Ok("No Data Found!! for customer Id" + customerId);
                }
                
            }
            catch(Exception ex)
            {
                return Ok(ex.Message.ToString());
            }
        }
    }
}
