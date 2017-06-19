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

$("#li").click(function(){
  var abc = $(this).parent().css({"color": "red", "border": "2px solid red"});
  console.dir(abc);
   var abc = $(this).parent().val();
  console.dir(abc);
 });
//   var tyu = $(this).html();
//   console.log(tyu);
// fetch('quotes', {
//   method: 'delete',
//   headers: {'Content-Type': 'application/json'},
// })
// .then(res => {
//   if (res.ok) return res.json()
// })
// .then(data => {
//   console.dir("hello");
//   console.dir(data);//this is the last previous entered quote
//   window.location.reload(true)
// })
// })
       });