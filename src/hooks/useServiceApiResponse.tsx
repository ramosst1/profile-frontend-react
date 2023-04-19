import { useEffect, useState } from "react"
import IErrorMessageModel from "../interfaces/api-error-message";
import { IMessageModel } from "../interfaces/states/error-message-model";


export default function useServiceApiResponse<TResponse>(service:Promise<any> | undefined = undefined){

    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<TResponse>();
    const [messages, setMessage] = useState<IErrorMessageModel[]>([]);

    useEffect(() => {

        setLoading(true);

        if(service) { 
            service.then(response => {
    

              setApiResponse(response);
    
               if(response.messages.length) {
    
                const errormessages = Array.from<IMessageModel>(response.messages).map( (item) =>  {
                  const tempMessage: IErrorMessageModel = {
                    message: item.internalMessage,
                    statusCode: item.statusCode
                  };
    
                  return tempMessage;
                });
    
                 setMessage(errormessages);
               };
        
              })
              .catch((error) => {
                setMessage(error)
              })
              .finally(() => {
                
                setLoading(false);
              });
    
            }
    

    }, [service])


    return {loading, messages, apiResponse}
}