using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class AllocateSubjectDataService : IAllocateSubjectDataService
    {
        IDataService _dataService;

        public AllocateSubjectDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public void SaveAllocateSubject(AllocateSubject allosubject)
        {
            try
            {

                DbParameter[] arrSqlParam = new DbParameter[2];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: allosubject.TeacherID);
                arrSqlParam[1] = DataServiceBuilder.CreateDBParameter("@SubjectID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: allosubject.SubjectID);
                _dataService.ExecuteNonQuery("[dbo].[SaveAllocateSubject]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AllocateSubject> GetAllocateSubjects(int teacherID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, teacherID);

                List<AllocateSubject> allosubject = new List<AllocateSubject>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetAllocateSubjects]", arrSqlParam);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        allosubject.Add(new AllocateSubject
                        {
                            AllocateSubjectID = dataReader.GetInt32("AllocateSubjectID"),
                            SubjectName = dataReader.GetString("SubjectName"),

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

        public void DeleteAllocateSubject(int allosubjectID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@AllocateSubjectID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, allosubjectID);

                _dataService.ExecuteNonQuery("[dbo].[DeleteAllocateSubject]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

