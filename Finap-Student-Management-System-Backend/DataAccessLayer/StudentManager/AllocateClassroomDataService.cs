using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class AllocateClassroomDataService : IAllocateClassroomDataService
    {
        IDataService _dataService;

        public AllocateClassroomDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public void SaveAllocateClassroom(AllocateClassroom allocateClassroom)
        {
            try
            {

                DbParameter[] arrSqlParam = new DbParameter[2];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: allocateClassroom.TeacherID);
                arrSqlParam[1] = DataServiceBuilder.CreateDBParameter("@ClassroomID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: allocateClassroom.ClassroomID);
                _dataService.ExecuteNonQuery("[dbo].[SaveAllocateClassroom]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AllocateClassroom> GetAllocateClassrooms(int teacherID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, teacherID);

                List<AllocateClassroom> allosubject = new List<AllocateClassroom>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetAllocateClassrooms]", arrSqlParam);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        allosubject.Add(new AllocateClassroom
                        {
                            AllocateClassroomID = dataReader.GetInt32("AllocateClassroomID"),
                            ClassroomName = dataReader.GetString("ClassroomName"),

                        });
                    }
                    reader.Close();
                }

                return allosubject;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteAllocateClassroom(int allocateClassroomID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@AllocateClassroomID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, allocateClassroomID);

                _dataService.ExecuteNonQuery("[dbo].[DeleteAllocateClassroom]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

