using BusinessObjects.TestModule;
using DataAccessLayer.Interfaces.TestModule;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace DataAccessLayer.TestModule
{
    public class TeacherDataService : ITeacherDataService
    {
        IDataService _dataService;

        public TeacherDataService(IDataService dataService)
        {
            _dataService = dataService;
        }

        public void SaveTeacher(Teacher teacher)
        {
            try
            {

                DbParameter[] arrSqlParam = new DbParameter[5];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, value: teacher.TeacherID);
                arrSqlParam[1] = DataServiceBuilder.CreateDBParameter("@FirstName", System.Data.DbType.String, System.Data.ParameterDirection.Input, value: teacher.FirstName);
                arrSqlParam[2] = DataServiceBuilder.CreateDBParameter("@LastName", System.Data.DbType.String, System.Data.ParameterDirection.Input, teacher.LastName);
                arrSqlParam[3] = DataServiceBuilder.CreateDBParameter("@ContactNo", System.Data.DbType.String, System.Data.ParameterDirection.Input, teacher.ContactNo);
                arrSqlParam[4] = DataServiceBuilder.CreateDBParameter("@EmailAddress", System.Data.DbType.String, System.Data.ParameterDirection.Input, teacher.EmailAddress);

                _dataService.ExecuteNonQuery("[dbo].[SaveTeacher]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Teacher> GetTeacher()
        {
            try
            {
                List<Teacher> teachers = new List<Teacher>();
                DbDataReader reader = _dataService.ExecuteReader("[dbo].[GetTeachers]", null);

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        DataReader dataReader = new DataReader(reader);
                        teachers.Add(new Teacher
                        {
                            TeacherID = dataReader.GetInt32("TeacherID"),
                            FirstName = dataReader.GetString("FirstName"),
                            LastName = dataReader.GetString("LastName"),
                            ContactNo = dataReader.GetString("ContactNo"),
                            EmailAddress = dataReader.GetString("EmailAddress")
                        });
                    }
                    reader.Close();
                }

                return teachers;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteTeacher(int teacherID)
        {
            try
            {
                DbParameter[] arrSqlParam = new DbParameter[1];
                arrSqlParam[0] = DataServiceBuilder.CreateDBParameter("@TeacherID", System.Data.DbType.Int32, System.Data.ParameterDirection.Input, teacherID);
                _dataService.ExecuteNonQuery("[dbo].[DeleteTeacher]", arrSqlParam);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

