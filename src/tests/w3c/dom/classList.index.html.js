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

// No features are needed for this test.
var xml = xmlHelper.getXmlObject(config);

// Add the helper JS.
xml.body.script += <script src="tests/w3c/dom/_domUtil.js"></script>;
xml.body.script += <script src="tests/w3c/dom/_domTokenListUtil.js"></script>;

// Add a couple test nodes after the last script tag, whcih is the last tag anyways.
xml.body.script += <div id="test500" class="class1 class2 classXYZ"></div>;