//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace EmployeeApiService.Support
{
    
    /// <summary>
    /// the employee service interface
    /// </summary>
    public class EmployeeService : EmployeeApiService.Support.IEmployeeService
    {
        IConfiguration _configuration;
        public EmployeeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GetCustomers(string customerId, string cookieToken)
        {
            try
            {
                var url = _configuration["Development:GetCustomres"];
                var uriBuilder = new UriBuilder(url+customerId);
                var httpClient = new HttpClient();

                var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uriBuilder.ToString());
                httpRequestMessage.Headers.Add("Cookie", cookieToken);
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
                HttpResponseMessage response = await  httpClient.SendAsync(httpRequestMessage);
                if (response.IsSuccessStatusCode)
                {
                    string stringResponse = await response.Content.ReadAsStringAsync();
                    return stringResponse;
                }
                else
                    return null;

            }
            catch(Exception ex)
            {
                throw new System.Exception(ex.Message.ToString());
            }
        }
    }
}
