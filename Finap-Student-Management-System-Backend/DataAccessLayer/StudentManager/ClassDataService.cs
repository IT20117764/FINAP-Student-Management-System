using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class ClassDataService : IClassDataService
    {
        IDataService _dataService;

        public ClassDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public void SaveClass(Class classroom)
        {
            try
            {

                DbParameter[] arrSqlParam = new DbParameter[2];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@ClassroomID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: classroom.ClassroomID);
                arrSqlParam[1] = DataServiceBuilder.CreateDBParameter("@ClassroomName", System.Data.DbType.String, System.Data.ParameterDirection.Input, value: classroom.ClassroomName);
                _dataService.ExecuteNonQuery("[dbo].[SaveClass]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Class> GetClasses()
        {
            try
            {
                List<Class> classrooms = new List<Class>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetClasses]", null);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        classrooms.Add(new Class
                        {
                            ClassroomID = dataReader.GetInt32("ClassroomID"),
                            ClassroomName = dataReader.GetString("ClassroomName"),
                           
                        });
                    }
                    reader.Close();
                }

                return classrooms;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteClass(int classID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@ClassroomID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, classID);

                _dataService.ExecuteNonQuery("[dbo].[DeleteClass]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

