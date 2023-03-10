using ApplicationServices.TestModule;
using BusinessObjects.Base;
using BusinessObjects.TestModule;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finap_Test_Backend.Controllers.TestModule
{
    [Route("[controller]/[action]")]
    public class ClassController : BaseController
    {

        [HttpPost]
        public APIResponce SaveClass([FromBody] Class data)
        {
            try
            {
                ClassApplicationService objAS = new ClassApplicationService();
                objAS.SaveClass(data);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpGet]
        public APIResponce GetClasses()
        {
            try
            {
                ClassApplicationService objAS = new ClassApplicationService();
                var response = objAS.GetClasses();
                return this.GenerateSucessMessage(response);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }

        [HttpDelete]
        public APIResponce DeleteClass(int classID)
        {
            try
            {
                ClassApplicationService objAS = new ClassApplicationService();
                objAS.DeleteClass(classID);
                return this.GenerateSucessMessage(true);
            }
            catch (Exception ex)
            {
                return GenerateExceptionMessage(null, ex);
            }
        }
    }
}
