using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class SubjectApplicationService
    {
        public void SaveSubject(Subject subject)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                ISubjectDataService objDS = new SubjectDataService(dataService);
                objDS.SaveSubject(subject);
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
        public List<Subject> GetSubjects()
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                ISubjectDataService objDS = new SubjectDataService(dataService);
                return objDS.GetSubjects();

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
        public void DeleteSubject(int subjectID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                ISubjectDataService objDS = new SubjectDataService(dataService);
                objDS.DeleteSubject(subjectID);
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

