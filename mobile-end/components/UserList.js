// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import { getUsers } from '../api/api';

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//       setLoading(false);
//     } catch (err) {
//       setError('Erreur lors de la récupération des utilisateurs');
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Text>Chargement...</Text>;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <View>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text>{item.nom} - {item.email}</Text>
//         )}
//       />
//     </View>
//   );
// };

// export default UsersList;