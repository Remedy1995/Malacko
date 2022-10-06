//generate a random consignment number 
 class generateConsignment{
    
    constructor(prefix){
        this.prefix=prefix;

    }

      generate(){
        const random=Math.random()*2.5*100000;
        const change=random.toFixed(5);
        const slice=change.slice(0,5);
        const num=Math.round(slice);
       
        return this.prefix + "-" + num;
       }


}

module.exports=generateConsignment;