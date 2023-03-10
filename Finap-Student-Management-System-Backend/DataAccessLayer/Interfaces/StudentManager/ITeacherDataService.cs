using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface ITeacherDataService
    {
        void SaveTeacher(Teacher teacher);
        void DeleteTeacher(int teacherID);
        List<Teacher> GetTeacher();
    }
}


