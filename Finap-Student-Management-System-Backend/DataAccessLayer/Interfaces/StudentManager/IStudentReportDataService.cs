using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface IStudentReportDataService
    {
        List<StudentReport> GetStudentReport(int studentID);
        List<StudentReport> GetSubjectTeacher(int studentID);
    }
}

