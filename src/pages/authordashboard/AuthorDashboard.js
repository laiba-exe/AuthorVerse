import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, push, get, remove, update } from 'firebase/database';
import app from '../../firebase/Firebase';
import './authordashboard.styles.css';

const AuthorDashboard = () => {
  const [authorData, setAuthorData] = useState(null);
  const [books, setBooks] = useState([]);
  const [stories, setStories] = useState([]);
  const [poems, setPoems] = useState([]);
  const authorId = 'AuthorId1'; // Replace 'AuthorId1' with the actual author ID
  const [deleteName, setDeleteName] = useState(''); // Add this line


  const fetchData = () => {
    try {
      const db = getDatabase(app);
      const authorRef = ref(db, `Authors/${authorId}`);

      onValue(authorRef, (snapshot) => {
        const authorData = snapshot.val();
        console.log('Fetched author data:', authorData); // Logging fetched author data
        setAuthorData(authorData);
        if (authorData) {
          setBooks(authorData.Books || []);
          setStories(authorData.Stories || []);
          setPoems(authorData.Poems || []);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error); // Logging any errors that occur during data fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleAddNewBook = async () => {
  //   try {
  //     const newBookName = window.prompt('Enter the name of the new book:');
  //     if (!newBookName) return; // If user cancels or provides empty input, exit
  
  //     const newBookDescription = window.prompt('Enter the description of the new book:');
  //     if (!newBookDescription) return; // If user cancels or provides empty input, exit
  
  //     const db = getDatabase(app);
  //     const newBookRef = push(ref(db, `Authors/${authorId}/Books`));
  //     const newBookData = {
  //       Name: newBookName,
  //       Description: newBookDescription,
  //     };
  //     await set(newBookRef, newBookData);
  //     // Fetch updated data after adding a new book
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error adding new book:', error);
  //   }
  // };

  const handleAddNewBook = async () => {
    try {
      const newBookName = window.prompt('Enter the name of the new book:');
      if (!newBookName) return; // If user cancels or provides empty input, exit
  
      const newBookDescription = window.prompt('Enter the description of the new book:');
      if (!newBookDescription) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      const booksRef = ref(db, `Authors/${authorId}/Books`);
      
      // Fetch the current number of books
      const booksSnapshot = await get(booksRef);
  
      let numBooks = 0;
      booksSnapshot.forEach(() => {
        numBooks++;
      });
  
      // Generate the next book ID
      const nextBookId = `BookId${numBooks + 1}`;
  
      // Create a reference for the new book with the generated ID
      const newBookRef = ref(db, `Authors/${authorId}/Books/${nextBookId}`);
      
      // Set the data for the new book
      await set(newBookRef, {
        Name: newBookName,
        Description: newBookDescription,
      });
      
      // Fetch updated data after adding a new book
      fetchData();
    } catch (error) {
      console.error('Error adding new book:', error);
    }
  };
  
  
  // const handleAddNewStory = async () => {
  //   try {
  //     const newStoryName = window.prompt('Enter the name of the new story:');
  //     if (!newStoryName) return; // If user cancels or provides empty input, exit
  
  //     const db = getDatabase(app);
  //     const newStoryRef = push(ref(db, `Authors/${authorId}/Stories`));
  //     const newStoryData = {
  //       Name: newStoryName,
  //     };
  //     await set(newStoryRef, newStoryData);
  //     // Fetch updated data after adding a new story
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error adding new story:', error);
  //   }
  // };
  
  // const handleAddNewPoem = async () => {
  //   try {
  //     const newPoemName = window.prompt('Enter the name of the new poem:');
  //     if (!newPoemName) return; // If user cancels or provides empty input, exit
  
  //     const db = getDatabase(app);
  //     const newPoemRef = push(ref(db, `Authors/${authorId}/Poems`));
  //     const newPoemData = {
  //       Name: newPoemName,
  //     };
  //     await set(newPoemRef, newPoemData);
  //     // Fetch updated data after adding a new poem
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error adding new poem:', error);
  //   }
  // };


  const handleAddNewStory = async () => {
    try {
      const newStoryName = window.prompt('Enter the name of the new story:');
      if (!newStoryName) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      const storiesRef = ref(db, `Authors/${authorId}/Stories`);
      
      // Fetch the current number of stories
      const storiesSnapshot = await get(storiesRef);
  
      let numStories = 0;
      storiesSnapshot.forEach(() => {
        numStories++;
      });
  
      // Generate the next story ID
      const nextStoryId = `StoryId${numStories + 5}`;
  
      // Create a reference for the new story with the generated ID
      const newStoryRef = ref(db, `Authors/${authorId}/Stories/${nextStoryId}`);
      
      // Set the data for the new story
      await set(newStoryRef, {
        Name: newStoryName,
      });
      
      // Fetch updated data after adding a new story
      fetchData();
    } catch (error) {
      console.error('Error adding new story:', error);
    }
  };
  
  const handleAddNewPoem = async () => {
    try {
      const newPoemName = window.prompt('Enter the name of the new poem:');
      if (!newPoemName) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      const poemsRef = ref(db, `Authors/${authorId}/Poems`);
      
      // Fetch the current number of poems
      const poemsSnapshot = await get(poemsRef);
  
      let numPoems = 0;
      poemsSnapshot.forEach(() => {
        numPoems++;
      });
  
      // Generate the next poem ID
      const nextPoemId = `PoemId${numPoems + 5}`;
  
      // Create a reference for the new poem with the generated ID
      const newPoemRef = ref(db, `Authors/${authorId}/Poems/${nextPoemId}`);
      
      // Set the data for the new poem
      await set(newPoemRef, {
        Name: newPoemName,
      });
      
      // Fetch updated data after adding a new poem
      fetchData();
    } catch (error) {
      console.error('Error adding new poem:', error);
    }
  };
  
  
  const handleDeleteBook = async (bookId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this book?');
      if (!confirmDelete) return; // If user cancels, exit
      const db = getDatabase(app);
      await remove(ref(db, `Authors/${authorId}/Books/${bookId}`));
      // Fetch updated data after deleting the book
      fetchData();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  const handleDeleteStory = async (storyId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this story?');
      if (!confirmDelete) return; // If user cancels, exit
      const db = getDatabase(app);
      await remove(ref(db, `Authors/${authorId}/Stories/${storyId}`));
      // Fetch updated data after deleting the story
      fetchData();
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };
  
  const handleDeletePoem = async (poemId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this story?');
      if (!confirmDelete) return; // If user cancels, exit
      const db = getDatabase(app);
      await remove(ref(db, `Authors/${authorId}/Poems/${poemId}`));
      // Fetch updated data after deleting the poem
      fetchData();
    } catch (error) {
      console.error('Error deleting poem:', error);
    }
  };
  
  


  const handleEditBook = async (bookId) => {
    try {
      const newBookName = window.prompt('Enter the new name of the book:');
      if (!newBookName) return; // If user cancels or provides empty input, exit
  
      const newBookDescription = window.prompt('Enter the new description of the book:');
      if (!newBookDescription) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      await update(ref(db, `Authors/${authorId}/Books/${bookId}`), {
        Name: newBookName,
        Description: newBookDescription,
      });
      // Fetch updated data after editing the book
      fetchData();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };
  
  const handleEditStory = async (storyId) => {
    try {
      const newStoryName = window.prompt('Enter the new name of the story:');
      if (!newStoryName) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      await update(ref(db, `Authors/${authorId}/Stories/${storyId}`), {
        Name: newStoryName,
      });
      // Fetch updated data after editing the story
      fetchData();
    } catch (error) {
      console.error('Error editing story:', error);
    }
  };
  
  const handleEditPoem = async (poemId) => {
    try {
      const newPoemName = window.prompt('Enter the new name of the poem:');
      if (!newPoemName) return; // If user cancels or provides empty input, exit
  
      const db = getDatabase(app);
      await update(ref(db, `Authors/${authorId}/Poems/${poemId}`), {
        Name: newPoemName,
      });
      // Fetch updated data after editing the poem
      fetchData();
    } catch (error) {
      console.error('Error editing poem:', error);
    }
  };
  







  return (
    <div>
      <h1>My Dashboard</h1>
      {authorData && (
        <>
          <h2>Author Profile</h2>
          <p>Name: {authorData.Name}</p>
          <p>Email: {authorData.Email}</p>
          <p>Date of Birth: {authorData['Date of Birth']}</p>
          <p>Description: {authorData.Description}</p>
          <h2>Books</h2>
      <ul>
         {authorData.Books &&
          Object.keys(authorData.Books).map((bookId) => (
            <li key={bookId}>
              <strong>Name:</strong> {authorData.Books[bookId].Name} <br />
              <strong>Description:</strong> {authorData.Books[bookId].Description}
              <button onClick={() => handleDeleteBook(bookId)}>Delete</button>
              <button onClick={() => handleEditBook(bookId)}>Edit</button>
            </li>
          ))} 
          {/* {authorData.Books &&
  Object.keys(authorData.Books).map((bookKey) => (
    <li key={bookKey}>
      <strong>Name:</strong> {authorData.Books[bookKey].Name} <br />
      <strong>Description:</strong> {authorData.Books[bookKey].Description}
      <button onClick={() => handleDeleteBook(bookKey)}>Delete</button>
    </li>
  ))} */}
      </ul>
      <h2>Stories</h2>
      <ul>
        {authorData.Stories &&
          Object.keys(authorData.Stories).map((storyId) => (
            <li key={storyId}>
              <strong>Name:</strong> {authorData.Stories[storyId].Name}
              <button onClick={() => handleDeleteStory(storyId)}>Delete</button>
              <button onClick={() => handleEditStory(storyId)}>Edit</button>
            </li>
          ))}
      </ul>
      <h2>Poems</h2>
      <ul>
        {authorData.Poems &&
          Object.keys(authorData.Poems).map((poemId) => (
            <li key={poemId}>
              <strong>Name:</strong> {authorData.Poems[poemId].Name}
              <button onClick={() => handleDeletePoem(poemId)}>Delete</button>
              <button onClick={() => handleEditPoem(poemId)}>Edit</button>
            </li>
          ))}
      </ul>
          {/* Display books, stories, and poems here */}
          <button onClick={handleAddNewBook}>Add New Book</button>
          <button onClick={handleAddNewStory}>Add New Story</button>
          <button onClick={handleAddNewPoem}>Add New Poem</button>
          
        </>
      )}
    </div>
  );
};

export default AuthorDashboard;





















// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, get, child, set, push } from 'firebase/database';

// const AuthorDashboard = () => {
//   const [authorData, setAuthorData] = useState(null);
//   const [books, setBooks] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [poems, setPoems] = useState([]);
//   const authorId = 'AuthorId1'; // Replace '123456' with the actual author ID

//   const fetchData = async () => {
//     try {
//       const db = getDatabase();
//       const authorRef = ref(db, `authors/${authorId}`);
//       const booksRef = child(authorRef, 'books');
//       const storiesRef = child(authorRef, 'stories');
//       const poemsRef = child(authorRef, 'poems');

//       const fetchBooksData = async () => {
//         const booksSnapshot = await get(booksRef);
//         if (booksSnapshot.exists()) {
//           const booksData = [];
//           booksSnapshot.forEach((childSnapshot) => {
//             booksData.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             });
//           });
//           setBooks(booksData);
//         }
//       };

//       const fetchStoriesData = async () => {
//         const storiesSnapshot = await get(storiesRef);
//         if (storiesSnapshot.exists()) {
//           const storiesData = [];
//           storiesSnapshot.forEach((childSnapshot) => {
//             storiesData.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             });
//           });
//           setStories(storiesData);
//         }
//       };

//       const fetchPoemsData = async () => {
//         const poemsSnapshot = await get(poemsRef);
//         if (poemsSnapshot.exists()) {
//           const poemsData = [];
//           poemsSnapshot.forEach((childSnapshot) => {
//             poemsData.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//             });
//           });
//           setPoems(poemsData);
//         }
//       };

//       // Fetch author data
//       const authorSnapshot = await get(authorRef);
//       if (authorSnapshot.exists()) {
//         setAuthorData(authorSnapshot.val());
//       }

//       // Fetch books, stories, and poems data
//       fetchBooksData();
//       fetchStoriesData();
//       fetchPoemsData();
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAddNewBook = async () => {
//     try {
//       const db = getDatabase();
//       const newBookRef = push(ref(db, `authors/${authorId}/books`));
//       await set(newBookRef, {
//         name: 'New Book Name',
//         description: 'New Book Description',
//       });
//       fetchData(); // Refresh data after adding a new book
//     } catch (error) {
//       console.error('Error adding new book:', error);
//     }
//   };

//   const handleAddNewStory = async () => {
//     try {
//       const db = getDatabase();
//       const newStoryRef = push(ref(db, `authors/${authorId}/stories`));
//       await set(newStoryRef, {
//         name: 'New Story Name',
//       });
//       fetchData(); // Refresh data after adding a new story
//     } catch (error) {
//       console.error('Error adding new story:', error);
//     }
//   };

//   const handleAddNewPoem = async () => {
//     try {
//       const db = getDatabase();
//       const newPoemRef = push(ref(db, `authors/${authorId}/poems`));
//       await set(newPoemRef, {
//         name: 'New Poem Name',
//       });
//       fetchData(); // Refresh data after adding a new poem
//     } catch (error) {
//       console.error('Error adding new poem:', error);
//     }
//   };

  

//   return (
//     <div>
//       {authorData && (
//         <>
//           <h2>Author Profile</h2>
//           <p>Name: {authorData.name}</p>
//           <p>Email: {authorData.email}</p>
//           <p>Date of Birth: {authorData.dateOfBirth}</p>
//           <p>Description: {authorData.description}</p>
//           {/* Display books, stories, and poems here */}
//           <button onClick={handleAddNewBook}>Add New Book</button>
//           <button onClick={handleAddNewStory}>Add New Story</button>
//           <button onClick={handleAddNewPoem}>Add New Poem</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthorDashboard;
