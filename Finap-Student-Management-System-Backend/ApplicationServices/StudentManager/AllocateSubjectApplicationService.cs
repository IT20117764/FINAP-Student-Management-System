using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class AllocateSubjectApplicationService
    {
        public void SaveAllocateSubject(AllocateSubject allosubject)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IAllocateSubjectDataService objDS = new AllocateSubjectDataService(dataService);
                objDS.SaveAllocateSubject(allosubject);
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
        public List<AllocateSubject> GetAllocateSubjects(int teacherID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                IAllocateSubjectDataService objDS = new AllocateSubjectDataService(dataService);
                return objDS.GetAllocateSubjects(teacherID);

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
        public void DeleteAllocateSubject(int allosubjectID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                IAllocateSubjectDataService objDS = new AllocateSubjectDataService(dataService);
                objDS.DeleteAllocateSubject(allosubjectID);
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

