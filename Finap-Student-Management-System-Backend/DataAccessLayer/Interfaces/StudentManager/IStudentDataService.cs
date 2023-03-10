using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface IStudentDataService
    {
        void SaveStudent(Student student);
        void DeleteStudent(int studentID);
        List<Student> GetStudents();
    }
}

