$(document).ready(function() {

        // $('#ul:last-child').css('color', 'green');

        $('li').css('color', 'orange');
        $('#ul li:nth-last-child(1)').css('color', 'blue');

        //var a = $('li:nth-last-child(1)').val();
        var a = $('li').text();
        //console.dir(a);

        //var name, quote;

        // $("#update").click(function(){
        //     name=$("#name").val();
        //     console.dir(name);
        //     quote=$("#quote").val();
        //     console.dir(quote);
        //     $.post("/", {name : name, quote : quote}).done(function(data, status){
        //       console.dir(data);
        //       //alert("data: " +data+"status:"+status);
        //       //$('#ul').prepend($('<li>').html( name +": "+quote))
        //   });
        // });
$("#update").click(function(){
  name=$("#name").val();
  console.dir(name);
  quote=$("#quote").val();
  console.dir(quote);
fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': name,
    'quote': quote
  })
})
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)//this is the last previous entered quote
  window.location.reload(true)
})
})

$("#delete").click(function(){
fetch('quotes', {
  method: 'delete',
  headers: {'Content-Type': 'application/json'},
})
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.dir("hello");
  console.dir(data);//this is the last previous entered quote
  window.location.reload(true)
})
})
       });

/**The first callback parameter data holds the content of the page requested,

data =
value:Object
name:"49"
quote:"49"
_id:"5910956d2018c81b60639594"

server side
req.body name 50 quote 50

Now, whenever someone clicks on the update button, the browser will send a PUT request through Fetch
to our Express server. Then, the server responds by sending the changed quote back to fetch. We can
then handle the response within by chaining fetch with a then method. This is possible because Fetch
 returns a Promise object.
The proper way to check if fetch resolved successfully is to use the okmethod on the response object.
 You can then return res.json() if you want to read the data that was sent from the server:
If you are working on a fancy webapp, this is the part where you use JavaScript to update the DOM so
users can see the new changes immediately. Updating the DOM is out of the scope of this article,
 so we’re just going to refresh the browser to see the changes.

**/