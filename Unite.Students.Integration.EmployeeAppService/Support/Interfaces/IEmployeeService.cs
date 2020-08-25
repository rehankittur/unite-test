//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace EmployeeApiService.Support
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// the employee service interface
    /// </summary>
    public interface IEmployeeService
    {
        System.Threading.Tasks.Task<string> GetCustomers(string customerId, string cookieToken);
    }
}
