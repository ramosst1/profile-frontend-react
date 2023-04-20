import { useEffect, useState } from "react"
import IErrorMessageModel from "../interfaces/api-error-message";
import { IMessageModel } from "../interfaces/states/error-message-model";


export default function useServiceApiResponse<TResponse>(service:Promise<any> | undefined = undefined){

    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<TResponse>();
    const [messages, setMessage] = useState<IErrorMessageModel[]>([]);

    useEffect(() => {
        if(!service) return;

        let finalResponse: any = undefined;

        if(service) { 

          setLoading(true);

          service.then(response => {
    

            finalResponse = response;

              if(response?.length){
    
                 setMessage(response);
                
              };

              if(response?.messages) {
    
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
                setMessage(error.messages)
              })
              .finally(() => {

                setApiResponse(finalResponse);
                setLoading(false);

              });
    
            }

      return () => {
        finalResponse = undefined;
      }

    }, [service])


    return {loading, messages, apiResponse}
}