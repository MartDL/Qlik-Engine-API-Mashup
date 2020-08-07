// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import QlikContext from './QlikContext';

// const ObjectsContext = React.createContext(null)
// export default ObjectsContext;



// const ObjectsProvider = ({ children }) => {
//     const { app } = useContext(QlikContext);
//     const [data, setData] = useState()

//     useEffect(() => {
//         const init = async () => {
//             const model = app.getObject('ajMAEu')
//             console.log(model)
      
//         }
//         init()
//     })


  


//     return (
//         <div>
//         <ObjectsContext.Provider value={{ app }}>
//             {children}
//             </ObjectsContext.Provider>
//         </div>
//     )
// }

// export { ObjectsProvider };
