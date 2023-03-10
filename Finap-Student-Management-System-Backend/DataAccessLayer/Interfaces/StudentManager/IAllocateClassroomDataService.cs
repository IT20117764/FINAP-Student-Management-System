using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface IAllocateClassroomDataService
    {
        void SaveAllocateClassroom(AllocateClassroom allocateClassroom);
        void DeleteAllocateClassroom(int allocateClassroomID);
        List<AllocateClassroom> GetAllocateClassrooms(int teacherID);
    }
}

