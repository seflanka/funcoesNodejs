//UTILS
import api from "../../utils/api";
//HOOKS
import useFlashMessage from "../useFlashMessage";

const {setFlashMessage} = useFlashMessage();
let typeMessage = undefined;
let message = undefined;
let returnData = undefined;
let metodoApi = undefined;
let typeDataSend = undefined;
let dataSend = undefined;

//*****************************ATENÇÃO****************************************
//TEM QUE TOMAR CUIDADO COM A QUANTIDADE DE ARQUIVOS QUE A ROTA DA API SUPORTA.

//*****************************TIPAGEM DOS DADOS******************************
//////////metodo : [STRING]  - "POST", "GET", "PUT" "PATCH"...
////////routeApi : [STRING]  - "/imobiliaria/cadastrar/agendamentos"
////formJsonData : [OBJETO]  - {imobiliaria: "Max", Locatario: "Guilherme de Souza", Aluguel: "R$ 10.000.00"}
//arrayFilesData : [ARRAY]   - {[Array com os arquivos] ou um array vazio []}
///////////token : [STRING]  - Token para autenticação
//////setMessage : [BOOLEAN] - (true ou false)
////////typeData : [STRING]  - ("json" ou "form")

export default function useHttpRequestProvider() {
    async function setHttpRequestProvider({metodo, routeApi, formJsonData, arrayFilesData, token, setMessage, typeData}) {
        const validate = await utilsValidateInfo({metodo, routeApi, formJsonData, arrayFilesData, token, setMessage, typeData});
        if (!validate) {
            return setFlashMessage("warning", "A função setHttpRequestProvider está incompleta!");
        }

        await metodoApi(`${routeApi}`, dataSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": typeDataSend,
            },
        })
            .then(async (response) => {
                message = response.data.message;
                returnData = await response.data;
                typeMessage = "sucess";
            })
            .catch((error) => {
                typeMessage = "error";
                message = error.response.data.message;
                returnData = undefined;
            });

        setMessage === true ? setFlashMessage(typeMessage, message) : undefined;

        return returnData;
    }

    async function utilsValidateInfo({metodo, routeApi, formJsonData, arrayFilesData, token, setMessage, typeData}) {
        if (!metodo || !routeApi || !formJsonData || !token || !setMessage || !typeData || !arrayFilesData) {
            return;
        }

        if (metodo == "post") {
            metodoApi = api.post;
        }
        if (metodo == "get") {
            metodoApi = api.get;
        }
        if (metodo == "patch") {
            metodoApi = api.patch;
        }

        if (typeData == "json") {
            dataSend = formJsonData;
            typeDataSend = "application/json";
        }
        if (typeData == "form") {
            if (arrayFilesData.length === 0) {
                return;
            }
            typeDataSend = "multipart/form-data";
            dataSend = await utilsFormDataGenerator(arrayFilesData, formJsonData);
        }
        return true;
    }

    async function utilsFormDataGenerator(arrayFilesData, formJsonData) {
        const formData = new FormData();
        const files = arrayFilesData;

        await files.forEach((file) => {
            formData.append(file?.tipoArquivo, {
                tipoArquivo: file?.tipoArquivo,
                name: file?.name,
                uri: file?.uri,
                type: file?.mimeType,
                size: file?.size,
                mimetype: file?.mimeType,
            });
        });
        Object.keys(formJsonData).forEach((key) => {
            formData.append(key, formJsonData[key]);
        });

        return formData;
    }

    return {setHttpRequestProvider};
}
//*****************************EXEMPLO DE USO****************************************

//import useHttpRequestProvider from "../../hooks/useHttpRequestProvider";

//    const {setHttpRequestProvider} = useHttpRequestProvider();

// const resultThen = await setHttpRequestProvider({
//     metodo: "post",
//     routeApi: "/vistoria/cadastrar/agendamento",
//     formJsonData: formJsonData,
//     arrayFilesData: arrayFilesData,
//     token: user?.token,
//     setMessage: true,
//     typeData: "form",
// });

// if (resultThen) {
//     console.log( "Deu tudo certo e passou no then");
// }
