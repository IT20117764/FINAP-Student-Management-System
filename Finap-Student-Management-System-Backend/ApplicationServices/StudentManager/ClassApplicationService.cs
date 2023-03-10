
using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class ClassApplicationService
    {
        public void SaveClass(Class classroom)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IClassDataService objDS = new ClassDataService(dataService);
                objDS.SaveClass(classroom);
                dataService.CommitTransaction();
            }
            catch (Exception)
            {
                dataService.RollbackTransaction();
                throw;
            }
            finally
            {
                dataService.Dispose();
            }
        }
        public List<Class> GetClasses()
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                IClassDataService objDS = new ClassDataService(dataService);
                return objDS.GetClasses();

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
        public void DeleteClass(int classID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IClassDataService objDS = new ClassDataService(dataService);
                objDS.DeleteClass(classID);
                dataService.CommitTransaction();
            }
            catch (Exception)
            {
                dataService.RollbackTransaction();
                throw;
            }
            finally
            {
                dataService.Dispose();
            }
        }
    }
}

