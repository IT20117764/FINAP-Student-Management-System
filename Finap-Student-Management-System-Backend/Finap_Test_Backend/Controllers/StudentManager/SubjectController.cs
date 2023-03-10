using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class SubjectController : BaseController
    {

        [HttpPost]
        public APIResponce SaveSubject([FromBody] Subject data)
        {
            try
            {
                SubjectApplicationService objAS = new SubjectApplicationService();
                objAS.SaveSubject(data);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpGet]
        public APIResponce GetSubjects()
        {
            try
            {
                SubjectApplicationService objAS = new SubjectApplicationService();
                var response = objAS.GetSubjects();
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpDelete]
        public APIResponce DeleteSubject(int subjectID)
        {
            try
            {
                SubjectApplicationService objAS = new SubjectApplicationService();
                objAS.DeleteSubject(subjectID);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }
    }
}
