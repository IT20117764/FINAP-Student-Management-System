using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class SubjectDataService : ISubjectDataService
        {
        IDataService _dataService;

        public SubjectDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public void SaveSubject(Subject subject)
    {
            try
            {

                DbParameter[] arrSqlParam = new DbParameter[2];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@SubjectID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: subject.SubjectID);
                arrSqlParam[1] = DataServiceBuilder.CreateDBParameter("@SubjectName", System.Data.DbType.String, System.Data.ParameterDirection.Input, value: subject.SubjectName);
                _dataService.ExecuteNonQuery("[dbo].[SaveSubject]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Subject> GetSubjects()
        {
            try
            {
                List<Subject> subjects = new List<Subject>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetSubjects]", null);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        subjects.Add(new Subject
                        {
                            SubjectID = dataReader.GetInt32("SubjectID"),
                            SubjectName = dataReader.GetString("SubjectName"),

                        });
                    }
                    reader.Close();
                }

                return subjects;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteSubject(int subjectID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@SubjectID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, subjectID);

                _dataService.ExecuteNonQuery("[dbo].[DeleteSubject]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

