class Birth  {
    constructor(output){
        this.output = output;
    }
 
    change= (age)=> { 
        console.log(age)
        this.output.change(age); 
    }
    reset =  ()=> {
         this.output.reset();
         }

};
export default Birth