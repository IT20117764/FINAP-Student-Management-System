using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class TeacherController : BaseController
    {

        [HttpPost]
        public APIResponce SaveTeacher([FromBody] Teacher data)
        {
            try
            {
                TeacherApplicationService objAS = new TeacherApplicationService();
                objAS.SaveTeacher(data);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpGet]
        public APIResponce GetTeacher()
        {
            try
            {
                TeacherApplicationService objAS = new TeacherApplicationService();
                var response = objAS.GetTeacher();
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpDelete]
        public APIResponce DeleteTeacher(int teacherID)
        {
            try
            {
                TeacherApplicationService objAS = new TeacherApplicationService();
                objAS.DeleteTeacher(teacherID);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }
    }
}
