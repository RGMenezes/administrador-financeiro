export default function Response(type, value, redirect){
    if(type === "error"){
        return {
            type: "error",
            msg: value,
            redirect: redirect
        };

    }else if(type === "success"){
        return{
            type: "success",
            msg: value,
            redirect: redirect
        };

    }else{
        return{
            type: "object",
            data: value,
            redirect: redirect
        }
    };
};