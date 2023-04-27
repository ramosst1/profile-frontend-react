import { useEffect, useState } from "react"
import IErrorMessageModel from "../interfaces/api-error-message";
import { IMessageModel } from "../interfaces/states/error-message-model";


export default function useServiceApiResponse<TResponse>(service:Promise<any> | undefined = undefined){

    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<TResponse>();
    const [messages, setMessage] = useState<IErrorMessageModel[]>([]);

    useEffect(() => {

      if(!service) return;

      let finalResponse: TResponse = null;

      try {
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
              setMessage([{ message: 'An unexpect error occured while retrieving data.', statusCode: '999'  } as IErrorMessageModel]);
            })
            .finally(() => {

              setApiResponse(finalResponse);

              setLoading(false);

            });
      }catch (e)
      {
        setMessage([{ message: 'An unexpect error occured while retrieving data.', statusCode: '999'  } as IErrorMessageModel]);
      }

      !finalResponse && setApiResponse(undefined as TResponse);

    }, [service])


    return {loading, messages, apiResponse}
}