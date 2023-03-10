using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class StudentReportDataService : IStudentReportDataService
    {
        IDataService _dataService;

        public StudentReportDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public List<StudentReport> GetStudentReport(int studentID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@StudentID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, studentID);

                List<StudentReport> allosubject = new List<StudentReport>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetStudentReport]", arrSqlParam);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        allosubject.Add(new StudentReport
                        {
                            FirstName = dataReader.GetString("FirstName"),
                            LastName = dataReader.GetString("LastName"),
                            Classroom = dataReader.GetString("ClassroomName"),
                            ContactPerson = dataReader.GetString("ContactPerson"),
                            EmailAddress = dataReader.GetString("EmailAddress"),
                            ContactNo = dataReader.GetString("ContactNo"),
                            DOB = dataReader.GetString("DOB"),

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
        public List<StudentReport> GetSubjectTeacher(int studentID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@StudentID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, studentID);

                List<StudentReport> allosubject = new List<StudentReport>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetSubjectTeacher]", arrSqlParam);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        allosubject.Add(new StudentReport
                        {
                            Subject = dataReader.GetString("Subject"),
                            Teacher = dataReader.GetString("Teacher")
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
    }
}

