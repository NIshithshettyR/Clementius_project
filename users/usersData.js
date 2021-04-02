exports.user = (req , res)=>{
res.json({
    userlist : [[
            firstname = "N", 
            lastname ="N",
            email = "n@gmail.com",
            dob = "9/12/1996"
        ] ,
        [
            firstname ="S", 
            lastname =  "S",
            email = "S@gmail.com",
            dob = "31/1/1969"]
        
    ]
});  
}