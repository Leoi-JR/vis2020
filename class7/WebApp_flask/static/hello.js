function sayHello() {
   console.log("Hello World")
    var dataForm = new FormData()
    dataForm.append('Math', 90)
    dataForm.append('Chinese', 95)

    $.ajax({
        url:"result",
        data:dataForm,
        cache:false,
        processData:false,
        contentType:false,
        type:'POST',
        success:function (data) {

                console.log('data',data,data.signal,data.boundary)

        }
    })
}