//cluter logic
const os = require('os')
const cluster = require('cluster')
exports.appListeningWithCluster = (app)=>{
    const nOfCpus = os.cpus().length;
    if(cluster.isMaster){
        console.log('start server Process ID : ' , process.pid)
        for(let i=0;i<nOfCpus;i++){
              cluster.fork()
        }
        cluster.on('exit',(worker,code,signal)=>{
            console.log('Worker destroyed with Process ID : ',worker.process.pid)
            cluster.fork()
        })
    }else{
        app.listen(process.env.PORT || 5000,()=>{
            console.log('Worker work with Process ID : ',process.pid)
            console.log(`App started at port : ${process.env.PORT || 5000}`)
        })
    }
}
exports.workerKilling = ()=>{
    cluster.worker.kill()
}