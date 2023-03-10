using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class AllocateClassroomApplicationService
    {
        public void SaveAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IAllocateClassroomDataService objDS = new AllocateClassroomDataService(dataService);
                objDS.SaveAllocateClassroom(allocateClassroom);
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
        public List<AllocateClassroom> GetAllocateClassrooms(int teacherID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                IAllocateClassroomDataService objDS = new AllocateClassroomDataService(dataService);
                return objDS.GetAllocateClassrooms(teacherID);

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
        public void DeleteAllocateClassroom(int allocateClassroomID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IAllocateClassroomDataService objDS = new AllocateClassroomDataService(dataService);
                objDS.DeleteAllocateClassroom(allocateClassroomID);
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

