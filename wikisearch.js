      /*
        document.getElementsByClassname("")
        document.getElementById("")
        document.getElementsByTagname("")
      */
      
      document.addEventListener("DOMContentLoaded", function(event) {
        var JSONRequest;
        
        document.getElementById("query-input").addEventListener('input', requestContent);
        //event.preventDefault();
        function requestContent() {
          var searchQuery = document.getElementById("query-input").value;
          console.log(searchQuery);
          var JSONRequestURL ="https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+searchQuery+"&origin=*&format=json";
          JSONRequest = new XMLHttpRequest();
          JSONRequest.onreadystatechange = displayContent;
          JSONRequest.open('GET',JSONRequestURL);
          JSONRequest.send();
        } //requestContent
        
        function logContent() {
          if (JSONRequest.readyState === XMLHttpRequest.DONE) {
            if(JSONRequest.status === 200) {
              console.log(JSONRequest.responseText);
            } else {
            console.log("Request failed");
            }
          }
        } //logContent
        
        function displayContent() {
          if (JSONRequest.readyState === XMLHttpRequest.DONE) {
            if(JSONRequest.status === 200) {
              //parse JSON
              var data = JSON.parse(JSONRequest.responseText);
              var wikiObjects = data.query.search;
              var totalHits = data.query.searchinfo.totalhits;
              const searchResults = document.querySelector('.results');
              //clear old data from page
              searchResults.innerHTML = '';
              //display new JSON data on page
              if (totalHits > 0) {
                wikiObjects.forEach(function(entry) {
                  const url = encodeURI(`https://en.wikipedia.org/wiki/${entry.title}`);
                  searchResults.insertAdjacentHTML('beforeend',
                    `<li>
                      <a href="${url}" target="_blank" rel="noopener">
                        <h3>${entry.title}</h3>
                        <p class="entry-snippet">${entry.snippet}</p>
                      </a>
                    </li>`
                  );
                });
              } else {
                searchResults.insertAdjacentHTML('beforeend',
                    `<li>
                      <h3>No Results</h3>
                    </li>`
                  );
              }
              
            } else {
            console.log("Request failed");
            }
          }
        } //displayContent

        //var listItems = Array.prototype.slice.call(document.getElementsByTagName("li"));

      });
      
      //window.addEventListener("online", function() {
      //    alert("online");
      //  });
      //window.addEventListener("offline", function() {
      //  alert("offline");
      //});
      