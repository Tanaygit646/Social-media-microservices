const cluster = require("cluster");
const os = require("os");
const express = require("express");
const totalCPUs = os.cpus().length

if(cluster.isPrimary){
    for(let i=0 ; i<totalCPUs ; i++ ){
        cluster.fork()
    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died , Restarting...`)
        cluster.fork();
    })
}else{
    const app = express() 
    const PORT = 8000;

    app.get("/",(req,res)=>{
       return res.json({
        message:`the server is running ${process.pid}`
       });
    });

    app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));
}