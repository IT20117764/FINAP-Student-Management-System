using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class AllocateClassroomController : BaseController
    {

        [HttpPost]
        public APIResponce SaveAllocateClassroom([FromBody] AllocateClassroom data)
        {
            try
            {
                AllocateClassroomApplicationService objAS = new AllocateClassroomApplicationService();
                objAS.SaveAllocateClassroom(data);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpGet]
        public APIResponce GetAllocateClassrooms(int teacherID)
        {
            try
            {
                AllocateClassroomApplicationService objAS = new AllocateClassroomApplicationService();
                var response = objAS.GetAllocateClassrooms(teacherID);
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpDelete]
        public APIResponce DeleteAllocateClassroom(int allocateClassroomID)
        {
            try
            {
                AllocateClassroomApplicationService objAS = new AllocateClassroomApplicationService();
                objAS.DeleteAllocateClassroom(allocateClassroomID);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }
    }
}
