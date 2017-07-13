//Level for logging
var LEVEL=5;
//function that return a mixing function
function logtype(logType:string) {
    var logLevel={
        error:4,
        warning:3,
        info:2,
        log:1,
    }
    //mixing function
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        var self=this;
        //old Method reference as a temp variable
        var orignalMethod=descriptor.value;
        descriptor.value=modifiedMethod;
        //spread using spread operator converts into the parameter
        function modifiedMethod(...args:any[]){
            //invoke the orignal after monkey patching
            //console.log(args);
            var msg=args[0];
            args[0]= `${"App Logger: "+logType + " : "+(new Date()) + " " + msg}`;
            if(logLevel[logType]<LEVEL){
                 orignalMethod.apply(self,args);
            }
            else{
                console.log("Method is not allowed");
            }
        }
        //return modified one method
        return descriptor;
    }
}
class Logger {
    @logtype("info")
    info(msg) {
        console.log(msg);
    }
    @logtype("error")
    error(msg){
        console.log(msg);
    }
    @logtype("log")
    log(msg){
        console.log(msg);
    }
    @logtype("warning")
    warning(msg){
        console.log(msg);
    }
}
var logger=new Logger();
logger.info("info");
logger.log("log");
logger.error("error");
logger.warning("warning");