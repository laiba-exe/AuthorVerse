// // AuthorsPage.js
// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const AuthorsPage = () => {
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       const database = getDatabase();
//       const authorsRef = ref(database, 'authors');

//       // Fetch authors from Firebase
//       onValue(authorsRef, (snapshot) => {
//         const authorsData = snapshot.val();
//         const authorsArray = authorsData ? Object.values(authorsData) : [];
//         setAuthors(authorsArray);
//       });
//     };

//     fetchAuthors();
//   }, []);

//   return (
//     <div>
//       <h2>Authors</h2>
//       <ul>
//         {authors.map((author) => (
//           <li key={author.authorId}>
//             <strong>{author.name}</strong>
//             <p>{author.description}</p>
//             <p>Email: {author.email}</p>
//             {/* Add links/buttons for more details */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AuthorsPage;







// 







// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import AuthorDetailsPage from '../authorsdetails/AuthorsDetailsPage';
// import app from '../../firebase/Firebase'; // Make sure app is exported in Firebase.js

// const AuthorsPage = () => {
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     const db = getDatabase(app);
//     const authorsRef = ref(db, 'Authors');

//     onValue(authorsRef, (snapshot) => {
//       const authorsData = snapshot.val();
//       const authorsList = [];

//       for (const authorId in authorsData) {
//         authorsList.push({
//           id: authorId,
//           ...authorsData[authorId]
//         });
//       }

//       setAuthors(authorsList);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Authors</h1>
//       <ul>
//         {authors.map((author) => (
//           <li key={author.id}>
//             <a href={`/authors/${author.id}`}>{author.Name}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AuthorsPage;







import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../../firebase/Firebase';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const authorsRef = ref(db, 'Authors');

    onValue(authorsRef, (snapshot) => {
      const authorsData = snapshot.val();
      const authorsList = [];

      // Loop through each author under 'Authors'
      for (const authorId in authorsData) {
        if (Object.prototype.hasOwnProperty.call(authorsData, authorId)) {
          const author = authorsData[authorId];
          // Push the author data to the list
          authorsList.push({
            id: authorId,
            name: author.Name,
            email: author.Email,
            // Add more fields as needed
          });
        }
      }

      // Set the authors list to state
      setAuthors(authorsList);
    });
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {/* Render each author */}
        {authors.map((author) => (
          <li key={author.id}>
            {/* Link to author details page */}
            <a href={`/authors/${author.id}`}>{author.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
