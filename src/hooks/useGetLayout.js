import { useState, useEffect, useContext} from 'react';
import QlikContext from '../context/QlikContext'

export const useGetLayout = (objectId) => {
    const [object, setObject] = useState(null)
    const {app} = useContext(QlikContext)
    useEffect(() => {
        (async () => {
            const model = await app.getObject(objectId)
            const layout = await model.getLayout()
            setObject(layout)
        })
        ();
    }, []);
    return object;
}

