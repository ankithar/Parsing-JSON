function viewJSON(what){
	
	var URL = what.URL.value;
	if(URL === "")
	{
		alert("Enter valid URL");
		return;
	}
	
	function UrlExists(url)
	{
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      var http=new XMLHttpRequest();
    } 
    else {
      var http=new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.open('HEAD', url, false);
	
    try{
	http.send();
	}
	catch{
		return false;
	}
	var check;
	if(http.status == 404 || http.status == 403)
		return false;
	else
    return true;
	}
	
	function loadJSON(url) {
			
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET",url,false);
		xmlhttp.send();
		jsonObj= JSON.parse(xmlhttp.responseText);
		return jsonObj; 		
	}
	var checkIfFileExists = UrlExists(URL);
	if(checkIfFileExists == false){
	alert("File does not exist");
	return;
	}
	jsonObj = loadJSON(URL);
	var tableArray = Object.keys(jsonObj.Mainline.Table);
	if (window.ActiveXObject) //if IE, simply execute script (due to async prop).
	{
		if (jsonObj.parseError.errorCode != 0) 
		{	
			var myErr = jsonObj.parseError;
	
			generateError(jsonObj);
			hWin = window.open("", "Error", "height=300,width=340");
			hWin.document.write(html_text);
		} 
		else {
			
			if(tableArray.indexOf('Row') == -1)
			{
			alert("No trucking list info.");	
			}
			else{
			generateHTML(jsonObj);
			hWin = window.open("", "Assignment4", "height=800,width=600");
			hWin.document.write(html_text); 
			}
			}
	} 
	else //else if FF, execute script once JSON object has loaded
	{
		if(tableArray.indexOf('Row') == -1)
		{
		alert("No trucking list info.");	
		}
		else{
		jsonObj.onload=generateHTML(jsonObj);
		hWin = window.open("", "Assignment4", "height=800,width=1000");
		hWin.document.write(html_text); 
		}
	} 
	hWin.document.close(); 
	}


	function generateHTML(jsonObj) 
	{

	root=jsonObj.DocumentElement;
	html_text="<html><head><title>Top Trucking Companies</title></head><body>";
	html_text+="<table border='2'>";
	
	var truckList = jsonObj.Mainline.Table;
	var header = truckList.Header.Data;
	html_text+="<tbody>";
	html_text+="<tr>";
	x=0; y=0;
	// output the headers
	for(i=0;i<header.length;i++) {
		
		html_text+="<th>"+header[i]+"</th>";
	}
	html_text+="</tr>";

	var rowArray = truckList.Row;
	for(j=0;j<rowArray.length;j++)
	{
	html_text+="<tr>";
	html_text+="<td>"+rowArray[j].Company+"</td>";
	html_text+="<td>"+rowArray[j].Services+"</td>";
	
	var hubArray = rowArray[j].Hubs.Hub;
	html_text+="<td style=\"width:25%;\"><ul>";
	for(k=0;k<hubArray.length;k++)
	{
		if(k == 0)
		{
			html_text+="<li style=\"font-weight:bold;\">"+hubArray[k]+"</li>";
		}
		else{
		html_text+="<li>"+hubArray[k]+"</li>";
		}
	}
	html_text+="</ul></td>";
	
	html_text+="<td>"+rowArray[j].Revenue+"</td>";
	
	var websiteLink = rowArray[j].HomePage;
	html_text+="<td><a href="+websiteLink+">"+rowArray[j].HomePage+"</a></td>";
	
	html_text+="<td style=\"width:35%;\"><img src="+rowArray[j].Logo + " style=\" display:block;width:100%; height:140px;\"" +" /></td>";
	
	html_text+="</tr>";
}
	


html_text+="</tbody>";
html_text+="</table>";
html_text+="</body></html>"; 

	
}