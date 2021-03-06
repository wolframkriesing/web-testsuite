/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	
	var supports = config.supports.Messaging;
	var _folderName = "test-folder-" + new Date().getTime();
	
	dohx.add({name:"MessagingFolder",
		mqcExecutionOrderBaseOffset:320000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Messaging"],
		tests:[
			//
			// createFolder
			//
			{
				id: 100,
				name: "createFolder - in emails",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.EmailMessage);
					wm.createFolder(wmt.EmailMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 200,
				name: "createFolder - in SMS",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.SMSMessage);
					wm.createFolder(wmt.SMSMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 300,
				name: "createFolder - in MMS",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.MMSMessage);
					wm.createFolder(wmt.MMSMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 400,
				name: "createFolder - Throw INVALID_PARAMETER for adding existing folder.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder(wmt.MMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 500,
				name: "createFolder - Throw INVALID_PARAMETER for no params.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 600,
				name: "createFolder - Throw INVALID_PARAMETER for missing params.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder(wmt.SMSMessage);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 700,
				name: "createFolder - Throw INVALID_PARAMETER for invalid message type.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("INVALID message type");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 800,
				name: "createFolder - Throw INVALID_PARAMETER for empty message type.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("", _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			// Tests when createFolder is not supported
			{
				id: 850,
				name: "createFolder is not supported - Throws UNSUPPORTED.",
				addIf:!supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("", _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			{
				id: 860,
				name: "createFolder is not supported - Throws UNSUPPORTED also if parameters are missing.",
				addIf:!supports.editFolder,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			
			//
			// deleteFolder
			//
			{
				id: 900,
				name: "deleteFolder - Let's remove the one we created in 'SMS'.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.SMSMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.SMSMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1000,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.SMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1100,
				name: "deleteFolder - Let's remove the one we created in 'MMS'.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.MMSMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.MMSMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1200,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.MMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1300,
				name: "deleteFolder - Let's remove the one we created in 'EMail'.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.EmailMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.EmailMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1400,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:supports.editFolder,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.EmailMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			// Tests when deleteFolder is not supported
			{
				id: 1450,
				name: "deleteFolder is not supported - Throws UNSUPPORTED.",
				addIf:!supports.editFolder,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.EmailMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			{
				id: 1460,
				name: "deleteFolder is not supported - Throws UNSUPPORTED also if parameters are missing.",
				addIf:!supports.editFolder,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			
			//
			// getFolderNames
			//
			{
				id: 1500,
				name: "getFolderNames - Verify folders in SMS.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in SMS?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.SMSMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			{
				id: 1600,
				name: "getFolderNames - Verify folders in MMS.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in MMS?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.MMSMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			{
				id: 1700,
				name: "getFolderNames - Verify folders in EMail.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in EMail?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.EmailMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			
			//
			// copyMessageToFolder
			//
			
			//
			// moveMessageToFolder
			//
		]
	});
})();

	//	DRAFTS:"DRAFTS",
	//	INBOX:"INBOX",
	//	OUTBOX:"OUTBOX",
	//	SENTBOX:"SENTBOX"
	//};
	//
	//wm.MessageTypes = {
	//	EmailMessage:"EmailMessage",
	//	MMSMessage:"MMSMessage",
	//	SMSMessage:"SMSMessage"
