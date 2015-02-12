"use strict";
window.isense = {};
var baseUrl = 'http://rsense-dev.cs.uml.edu/api/v1/';

var isense = {

    isense : function(projectID,contributorKey,contributorName){

        this.projectID = projectID;
        this.contributorKey = contributorKey;
        this.contributorName = contributorName;
    },


    projectGetRequest : function() {

        var urlProject = baseUrl+ 'projects/' + this.projectID+'?recur=true';
        var responseProject = $.ajax({ type: "GET",
                            url: urlProject,
                            async: false,
                            dataType: "JSON"
        }).responseText;

        var parsedResponseProject = JSON.parse(responseProject); 

        return parsedResponseProject;  
    },

    getDatasetLocation : function(datasetName,parsedResponseProject) {

        for (var j = 0; j < parsedResponseProject.dataSetCount; j++) { 

            if (parsedResponseProject.dataSets[j].name == datasetName) {

                var datasetLocation = j;
                var datasetID = parsedResponseProject.dataSets[j].id;
            }
        }

        if (datasetID == null) {

            return "Dataset Not Found"
        }
        return datasetLocation;
    },

    getFieldID : function(fieldName,parsedResponseProject) {

        for (var i = 0; i < parsedResponseProject.fieldCount; i++) {    // Parsing through fields looking for field id

            if (parsedResponseProject.fields[i].name == fieldName) {     // If field names match then this is the id

                var fieldID = parsedResponseProject.fields[i].id;       // This is the field ID
            }
        }

        if (fieldID == null) {

            return "Field Not Found"
        }

        fieldID = fieldID.toString();

        return fieldID;
    },

    getDatasetFieldData : function(datasetName,fieldName) {

        var values = [];
        var parsedResponseProject = isense.projectGetRequest(this.projectID);
        var datasetLocation = isense.getDatasetLocation(datasetName,parsedResponseProject);
        var fieldID = isense.getFieldID(fieldName,parsedResponseProject);

        for (var k = 0; k < parsedResponseProject.dataSets[datasetLocation].datapointCount; k++) {

            values.push(parsedResponseProject.dataSets[datasetLocation].data[k][fieldID])   
        }

        return values;
    },

    postDataset : function(fieldName,title,data) {

        var currentTime = new Date();
        var timestamp = JSON.stringify(currentTime);
        var parsedResponseProject = isense.projectGetRequest(this.projectID);
        var fieldID = isense.getFieldID(fieldName,parsedResponseProject);
        var fieldIDString = fieldID.toString();
        var dataForPost = {};
        dataForPost[fieldIDString] = data;
        var apiUrl = baseUrl+ 'projects/' + this.projectID+'/jsonDataUpload';

        var upload = {

            'title': title + ' ' + timestamp,
            'contribution_key': this.contributorKey,
            'contributor_name': this.contributorName,
            'data': dataForPost
        }
        $.post(apiUrl, upload);
        alert("Post Successful");
    },

    postDatasetHorizontal : function(fields,title,data) {

        var currentTime = new Date();
        var timestamp = JSON.stringify(currentTime);
        var parsedResponseProject = isense.projectGetRequest(this.projectID);
        var dataForPost = {};
        var fieldID = []

        for (var i = 0; i < fields.length; i++) {

            fieldID[i] = isense.getFieldID(fields[i],parsedResponseProject);
            dataForPost[fieldID[i]] = data[i];
        };

        var apiUrl = baseUrl+ 'projects/' + this.projectID+'/jsonDataUpload';
        var upload = {

            'title': title + ' ' + timestamp,
            'contribution_key': this.contributorKey,
            'contributor_name': this.contributorName,
            'data': dataForPost
        }
        $.post(apiUrl, upload);
        alert("Post Successful");
    },

    appendToDataset : function(datasetName,fields,data) {

        var apiUrl =' http://rsense-dev.cs.uml.edu/api/v1/data_sets/append';
        var upload = {

            'email': 'isenseproject@gmail.com',
            'password': 'fieilds',
            'id': 7736,
            'data': {'638':[4564,5,4,8,7,87,8,4,84]}
        }
        $.post(apiUrl, upload);
    }
};
