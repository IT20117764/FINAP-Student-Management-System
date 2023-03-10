using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class StudentReportApplicationService
    {
       
        public List<StudentReport> GetStudentReport(int studentID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                IStudentReportDataService objDS = new StudentReportDataService(dataService);
                return objDS.GetStudentReport(studentID);

            }
            catch (Exception)
            {
                dataService.Dispose();
                throw;
            }
            finally
            {
                dataService.Dispose();
            }
        }     
        public List<StudentReport> GetSubjectTeacher(int studentID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                IStudentReportDataService objDS = new StudentReportDataService(dataService);
                return objDS.GetSubjectTeacher(studentID);

            }
            catch (Exception)
            {
                dataService.Dispose();
                throw;
            }
            finally
            {
                dataService.Dispose();
            }
        }
      
    }
}


