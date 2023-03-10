using BusinessObjects.TestModule;
using DataAccessLayer;
using DataAccessLayer.Interfaces.TestModule;
using DataAccessLayer.TestModule;
using System;
using System.Collections.Generic;

namespace ApplicationServices.TestModule
{
    public class TeacherApplicationService
    {
        public void SaveTeacher(Teacher teacher)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                ITeacherDataService objDS = new TeacherDataService(dataService);
                objDS.SaveTeacher(teacher);
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
        public List<Teacher> GetTeacher()
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                ITeacherDataService objDS = new TeacherDataService(dataService);
                return objDS.GetTeacher();

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
        public void DeleteTeacher(int teacherID)
        {
            IDataService dataService = DataServiceBuilder.CreateDataService();
            try
            {
                dataService.BeginTransaction();

                ITeacherDataService objDS = new TeacherDataService(dataService);
                objDS.DeleteTeacher(teacherID);
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


