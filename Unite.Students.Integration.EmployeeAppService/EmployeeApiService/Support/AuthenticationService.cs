//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using EmployeeApiService.Models;
namespace EmployeeApiService.Support
{
    

    /// <summary>
    /// the employee service interface
    /// </summary>
    public class AuthenticationService : EmployeeApiService.Support.IAuthenticationService
    {
        IConfiguration _configuration;
        class AuthUser
        {
            public string username { get; set; }
            public string password { get; set; }
            public override string ToString()
            {
                return $"{username}: {password}";
            }
        }
        public AuthenticationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GetPadCookie()
        {
            try
            {
                var person = new AuthUser();
                person.username = _configuration["Development:LoginUserName"];
                person.password = _configuration["Development:LoginPassword"];

                var json = JsonConvert.SerializeObject(person);
                var data = new StringContent(json, Encoding.UTF8, "application/json");

                var url = _configuration["Development:EmployeeLogin"];
                var client = new HttpClient();

                var httpresponse = await client.PostAsync(url, data);

                string cookieToken = httpresponse.Headers.TryGetValues("Set-Cookie", out var values) ? values.FirstOrDefault() : null;
                string result = httpresponse.Content.ReadAsStringAsync().Result;
                return cookieToken;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
    }
}
