exports.sigup={
        isValiedBody:(data)=>{
            if(!data.name || !data.email){
                return false
            }
            return true
        }
    }