using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplicationDemo.Models;
using System.Web.Http.Cors;
using System.Web;

namespace WebApplicationDemo.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET api/Employee
        public List<EmployeeInfo> GetEmployees()
        {
            var empData = db.EmployeeInfoes.ToList();
            return empData;
        }

        [ResponseType(typeof(EmployeeInfo))]
        public EmployeeInfo GetEmployees(int id)
        {
            var empData = db.EmployeeInfoes.Where(x => x.EmployeeID == id).FirstOrDefault();
            return empData;
        }

        // PUT api/Employee/5
        public string PutEmployee(int id, EmployeeInfo employee)
        {
            var obj = db.EmployeeInfoes.Where(n => n.EmployeeID == id).FirstOrDefault();
            if (obj != null)
            {
                obj.EmpCode = employee.EmpCode;
                obj.FirstName = employee.FirstName;
                obj.LastName = employee.LastName;
                obj.Office = employee.Office;
                obj.Position = employee.Position;
                db.SaveChanges();
            }

            return "success";
        }

        // POST api/Employee

        public string PostEmployee(EmployeeInfo employee)
        {
            Random random = new Random();
            int value = random.Next(10000);
            employee.EmpCode = value.ToString();
            db.EmployeeInfoes.Add(employee);
            db.SaveChanges();

            return "Success";
        }


        // DELETE api/Employee/5

        public IHttpActionResult DeleteEmployee(int id)
        {
            EmployeeInfo employee = db.EmployeeInfoes.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            db.EmployeeInfoes.Remove(employee);
            db.SaveChanges();
            return Ok(employee);
        }

      


        [Route("user/PostUserImage")]
        [AllowAnonymous]
        public string PostUserImage()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return message;
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return message;
                        }
                        else
                         {

                            var filePath = HttpContext.Current.Server.MapPath("~/Userimage/" + file + extension);

                            postedFile.SaveAs(filePath);

                            int t = Int32.Parse(file);
 
                            this.checkeid(t, filePath);

                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    return message1;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return res;
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return res;
            }
        }
        public void checkeid(int id, string path)
        {
            EmployeeInfo emp = db.EmployeeInfoes.Where(x => x.EmployeeID == id).FirstOrDefault();
          
            emp.Profile = path;
            var y= this.PutEmployee(id, emp);
        }


    }
    
}