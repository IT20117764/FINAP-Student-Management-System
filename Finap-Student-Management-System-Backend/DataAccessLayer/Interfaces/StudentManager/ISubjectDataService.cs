using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface ISubjectDataService
    {
        void SaveSubject(Subject subject);
        void DeleteSubject(int subjectID);
        List<Subject> GetSubjects();
    }
}

