// 

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import app from '../../firebase/Firebase';

// const AuthorDetailsPage = () => {
//   const { authorId } = useParams();
//   const [author, setAuthor] = useState(null);

//   useEffect(() => {
//     const authorRef = app.ref(`Authors/${authorId}`);
//     authorRef.once('value', (snapshot) => {
//       const authorData = snapshot.val();
//       setAuthor(authorData);
//     });
//   }, [authorId]);

//   if (!author) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{author.Name}</h1>
//       <p>{author.Description}</p>
//       <h2>Books</h2>
//       <ul>
//         {author.Books &&
//           Object.keys(author.Books).map((bookId) => (
//             <li key={bookId}>{author.Books[bookId]}</li>
//           ))}
//       </ul>
//       <h2>Stories</h2>
//       <ul>
//         {author.Stories &&
//           Object.keys(author.Stories).map((storyId) => (
//             <li key={storyId}>{author.Stories[storyId]}</li>
//           ))}
//       </ul>
//       <h2>Poems</h2>
//       <ul>
//         {author.Poems &&
//           Object.keys(author.Poems).map((poemId) => (
//             <li key={poemId}>{author.Poems[poemId]}</li>
//           ))}
//       </ul>
//       <p>Email: {author.Email}</p>
//       <p>Date of Birth: {author['Date of Birth']}</p>
//     </div>
//   );
// };

// export default AuthorDetailsPage;






import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../../firebase/Firebase';
import { Link } from 'react-router-dom';
const AuthorDetailsPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const authorRef = ref(db, `Authors/${authorId}`);

    onValue(authorRef, (snapshot) => {
      const authorData = snapshot.val();
      setAuthor(authorData);
    });
  }, [authorId]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{author.Name}</h1>
      <p>Email: {author.Email}</p>
      <p>Date of Birth: {author['Date of Birth']}</p>
      <p>Description: {author.Description}</p>
      <h2>Books</h2>
      <ul>
        {author.Books &&
          Object.keys(author.Books).map((bookId) => (
            <li key={bookId}>
              <strong>Name:</strong> {author.Books[bookId].Name} <br />
              <strong>Description:</strong> {author.Books[bookId].Description}
            </li>
          ))}
      </ul>
      <h2>Stories</h2>
      <ul>
        {author.Stories &&
          Object.keys(author.Stories).map((storyId) => (
            <li key={storyId}>
              <strong>Name:</strong> {author.Stories[storyId].Name}
            </li>
          ))}
      </ul>
      <h2>Poems</h2>
      <ul>
        {author.Poems &&
          Object.keys(author.Poems).map((poemId) => (
            <li key={poemId}>
              <strong>Name:</strong> {author.Poems[poemId].Name}
            </li>
          ))}
      </ul>

      
    </div>
  );
};

export default AuthorDetailsPage;
