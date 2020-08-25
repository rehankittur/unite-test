using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeApiService.Models
{
    /// <summary>
    /// the basic customer details
    /// </summary>
    public class BasicCustomer : BasicCustomerBase
    {
        /// <summary>
        /// Gets or sets a value indicating whether the customer has has an active booking.
        /// </summary>
        /// <value>
        ///   <c>true</c> if the customer has an active booking; otherwise, <c>false</c>.
        /// </value>
        public bool HasAnActiveBooking { get; set; }

        /// <summary>
        /// Gets or sets the name of the building.
        /// </summary>
        /// <value>
        /// The name of the building.
        /// </value>
        public string BuildingName { get; set; }

        /// <summary>
        /// the id of the building or null
        /// </summary>
        internal int? BuildingId { get; set; }

        /// <summary>
        /// The university the customer is attending
        /// </summary>
        public string University { get; set; }

        /// <summary>
        /// the home country of the customer
        /// </summary>
        public string HomeCountry { get; set; }

        /// <summary>
        /// the course the customer is studding on
        /// </summary>
        public string Course { get; set; }

        
    }

    /// <summary>
    /// A customer object with additional mobile phone variable
    /// </summary>
    

    /// <summary>
    /// Class BasicCustomer2.
    /// </summary>
    /// <seealso cref="UNITE.External.API.Models.BasicCustomerBase" />
    public class BasicCustomer2 : BasicCustomerBase
    {
        /// <summary>
        /// The customer's preferred name
        /// </summary>
        public string PreferredName { get; set; }
    }

    /// <summary>
    /// Class BasicCustomer2.
    /// </summary>
    public class BasicCustomerBase
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>

        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the given.
        /// </summary>
        /// <value>
        /// The name of the given.
        /// </value>
        public string GivenName { get; set; }

        /// <summary>
        /// Gets or sets the name of the family.
        /// </summary>
        /// <value>
        /// The name of the family.
        /// </value>
        public string FamilyName { get; set; }

        /// <summary>
        /// Gets or sets the customer identifier.
        /// </summary>
        /// <value>
        /// The customer identifier.
        /// </value>
        public string CustomerId { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>
        /// The email.
        /// </value>
        public string Email { get; set; }
    }
}