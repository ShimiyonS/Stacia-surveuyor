// import axios from 'axios';
// import React, {useEffect, useState} from 'react'

// export default function UserSelectTemplate() {
//     const [surveyors, setSurveyors] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const selectBySurveyor = async () => {
//         try {
//             const users = await axios.get("http://192.168.0.115:8000/user/surveyors");
//             setSurveyors(users.data.data);
//             setLoading(false);
            
//         } catch (err) {
//             console.log(err.message);
//         }
//     };

//     useEffect(() => {
//         selectBySurveyor();
//         console.log(surveyors);
//     }, []);

//     return (
//         <div>
//             {

//             }
//         </div>
//     )
// }

import React from 'react'

export default function UserSelectTemplate() {
  return (
    <div>UserSelectTemplate</div>
  )
}
