class MacroCommand {
    constructor() {
      this.commandList =[];  
    }
    add(command) {            
        this.commandList.push(command);
    }
   execute () {  
           if (this.commandList.length>1){
                 this.commandList[0].execute();
                 setTimeout(()=>{},10000)
                 this.commandList[1].execute();
           }else{
               this.commandList[0].execute();
           }
    //   for (const command of this.commandList) {
    //    await command.execute();
    //   }
    // this.commandList.execute();
    }
  }

export default MacroCommand