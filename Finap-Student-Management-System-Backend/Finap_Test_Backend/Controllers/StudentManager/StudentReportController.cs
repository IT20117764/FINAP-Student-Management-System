using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class StudentReportController : BaseController
    {


        [HttpGet]
        public APIResponce GetStudentReport(int studentID)
        {
            try
            {
                StudentReportApplicationService objAS = new StudentReportApplicationService();
                var response = objAS.GetStudentReport(studentID);
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }  
        
        [HttpGet]
        public APIResponce GetSubjectTeacher(int studentID)
        {
            try
            {
                StudentReportApplicationService objAS = new StudentReportApplicationService();
                var response = objAS.GetSubjectTeacher(studentID);
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

    }
    }

