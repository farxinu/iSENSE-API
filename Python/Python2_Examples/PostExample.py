import API

api = API.Isense('106','key','TYLER')

print api.getDatasetFieldData('MLB Team Statistics 2013','Runs')

print api.postDataset('Runs','MLB Team Statistics 2013',[5])

print api.postDatasetHorizontal(['Runs','Hits'],'Test',[[5],[2]])

print api.appendToDataset('TESTETSTES 2015-03-18 17:26:40',['Runs','Hits'],[[5],[2]])