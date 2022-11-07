import { Toast } from "native-base";

export function toastBase(title: string, type: 'success' | 'error' | 'warning'){
    return Toast.show({
        title: title, 
        placement: 'top',
        width: '100%',
        bgColor: type === 'error' ? 'red.500' : 
                type === 'warning' ? 'orange.500' : 
                type === 'success' ? 'green.500' :
                'gray.800'
    })
}