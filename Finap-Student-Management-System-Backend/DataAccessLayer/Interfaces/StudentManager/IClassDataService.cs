using BusinessObjects.TestModule;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces.TestModule
{
    public interface IClassDataService
    {
        void SaveClass(Class classroom);
        void DeleteClass(int classID);
        List<Class> GetClasses();
    }
}

