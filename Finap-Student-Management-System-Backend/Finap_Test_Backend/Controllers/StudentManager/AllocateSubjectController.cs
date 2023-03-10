using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class AllocateSubjectController : BaseController
    {

        [HttpPost]
        public APIResponce SaveAllocateSubject([FromBody] AllocateSubject data)
        {
            try
            {
                AllocateSubjectApplicationService objAS = new AllocateSubjectApplicationService();
                objAS.SaveAllocateSubject(data);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpGet]
        public APIResponce GetAllocateSubjects(int teacherID)
        {
            try
            {
                AllocateSubjectApplicationService objAS = new AllocateSubjectApplicationService();
                var response = objAS.GetAllocateSubjects(teacherID);
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpDelete]
        public APIResponce DeleteAllocateSubject(int allocateSubjectID)
        {
            try
            {
                AllocateSubjectApplicationService objAS = new AllocateSubjectApplicationService();
                objAS.DeleteAllocateSubject(allocateSubjectID);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }
    }
}
