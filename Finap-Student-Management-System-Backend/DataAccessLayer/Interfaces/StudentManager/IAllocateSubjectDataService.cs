using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface IAllocateSubjectDataService
    {
        void SaveAllocateSubject(AllocateSubject allosubject);
        void DeleteAllocateSubject(int allosubjectID);
        List<AllocateSubject> GetAllocateSubjects(int teacherID);
    }
}

